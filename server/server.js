import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
import rateLimit from 'express-rate-limit';
import { stmts } from './db.js';

const PORT = Number(process.env.PORT || 3001);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const PUBLIC_BASE_URL = (process.env.PUBLIC_BASE_URL || 'https://tedxyola.com').replace(/\/$/, '');
const SHORT_PREFIX = process.env.SHORT_PREFIX || '/8fub3h';
const COOKIE_NAME = 'tedx_admin';
const COOKIE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const IS_PROD = process.env.NODE_ENV === 'production';

if (!ADMIN_PASSWORD) {
  console.error('FATAL: ADMIN_PASSWORD env var is required');
  process.exit(1);
}
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error('FATAL: JWT_SECRET env var must be set (>= 32 chars)');
  process.exit(1);
}

const app = express();
app.set('trust proxy', 1); // behind Apache
app.use(express.json({ limit: '32kb' }));
app.use(cookieParser());

// ---------- helpers ----------
const SLUG_RE = /^[a-zA-Z0-9_-]{3,40}$/;
const randomSlug = (len = 6) => {
  const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
};
const buildShortUrl = (slug) => `${PUBLIC_BASE_URL}${SHORT_PREFIX}/${slug}`;

const requireAdmin = (req, res, next) => {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== 'admin') throw new Error('bad role');
    next();
  } catch {
    return res.status(401).json({ error: 'unauthorized' });
  }
};

// ---------- auth ----------
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/admin/login', loginLimiter, (req, res) => {
  const { password } = req.body || {};
  if (typeof password !== 'string' || password.length === 0) {
    return res.status(400).json({ error: 'password required' });
  }
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'invalid password' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: IS_PROD,
    maxAge: COOKIE_MAX_AGE_MS,
    path: '/',
  });
  res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  res.json({ ok: true });
});

app.get('/api/admin/me', requireAdmin, (req, res) => {
  res.json({ ok: true });
});

// ---------- link management ----------
app.get('/api/admin/links', requireAdmin, (req, res) => {
  const rows = stmts.listAll.all();
  res.json({
    links: rows.map((r) => ({
      slug: r.slug,
      target_url: r.target_url,
      short_url: buildShortUrl(r.slug),
      created_at: r.created_at,
      clicks: r.clicks,
      last_click: r.last_click,
    })),
  });
});

app.post('/api/admin/links', requireAdmin, (req, res) => {
  let { url, slug } = req.body || {};
  if (typeof url !== 'string') return res.status(400).json({ error: 'url required' });
  url = url.trim();
  try {
    const u = new URL(url);
    if (!['http:', 'https:'].includes(u.protocol)) throw new Error('bad protocol');
  } catch {
    return res.status(400).json({ error: 'invalid url' });
  }

  if (slug != null && slug !== '') {
    if (typeof slug !== 'string' || !SLUG_RE.test(slug)) {
      return res.status(400).json({
        error: 'slug must be 3–40 chars: letters, numbers, hyphen, underscore',
      });
    }
  } else {
    // auto-generate, retry on collision
    for (let i = 0; i < 8; i++) {
      const candidate = randomSlug(6);
      if (!stmts.getBySlug.get(candidate)) {
        slug = candidate;
        break;
      }
    }
    if (!slug) return res.status(500).json({ error: 'could not generate slug' });
  }

  if (stmts.getBySlug.get(slug)) {
    return res.status(409).json({ error: 'slug already exists' });
  }

  stmts.insert.run(slug, url, Date.now());
  const row = stmts.getBySlug.get(slug);
  res.status(201).json({
    slug: row.slug,
    target_url: row.target_url,
    short_url: buildShortUrl(row.slug),
    created_at: row.created_at,
    clicks: row.clicks,
  });
});

app.delete('/api/admin/links/:slug', requireAdmin, (req, res) => {
  const info = stmts.deleteBySlug.run(req.params.slug);
  if (info.changes === 0) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true });
});

// ---------- QR endpoint (public) ----------
app.get('/api/qr/:slug.png', async (req, res) => {
  const row = stmts.getBySlug.get(req.params.slug);
  if (!row) return res.status(404).send('not found');
  try {
    const size = Math.min(Math.max(Number(req.query.size) || 512, 128), 2048);
    const buf = await QRCode.toBuffer(buildShortUrl(row.slug), {
      type: 'png',
      width: size,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#FFFFFF' },
    });
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(buf);
  } catch (e) {
    console.error(e);
    res.status(500).send('qr error');
  }
});

app.get('/api/qr/:slug.svg', async (req, res) => {
  const row = stmts.getBySlug.get(req.params.slug);
  if (!row) return res.status(404).send('not found');
  try {
    const svg = await QRCode.toString(buildShortUrl(row.slug), {
      type: 'svg',
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#FFFFFF' },
    });
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(svg);
  } catch (e) {
    console.error(e);
    res.status(500).send('qr error');
  }
});

// ---------- redirect ----------
app.get(`${SHORT_PREFIX}/:slug`, (req, res) => {
  const row = stmts.getBySlug.get(req.params.slug);
  if (!row) return res.status(404).send('Short link not found');
  stmts.bumpClick.run(Date.now(), row.slug);
  res.redirect(302, row.target_url);
});

// health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, '127.0.0.1', () => {
  console.log(`tedxyola-shortener listening on 127.0.0.1:${PORT}`);
  console.log(`Short prefix: ${SHORT_PREFIX}  Public base: ${PUBLIC_BASE_URL}`);
});
