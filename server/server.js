import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
import rateLimit from 'express-rate-limit';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stmts } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_SVG_BUF = fs.readFileSync(path.join(__dirname, 'assets', 'logo.svg'));
const LOGO_SVG_TEXT = LOGO_SVG_BUF.toString('utf8');
// Detect the logo's intrinsic viewBox so the SVG QR overlay scales correctly.
const LOGO_VB_MATCH = LOGO_SVG_TEXT.match(
  /viewBox="\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*"/i
);
const LOGO_VB = LOGO_VB_MATCH
  ? `${LOGO_VB_MATCH[1]} ${LOGO_VB_MATCH[2]} ${LOGO_VB_MATCH[3]} ${LOGO_VB_MATCH[4]}`
  : '0 0 64 64';
// Inline SVG fragment (no <svg> wrapper) for embedding inside other SVGs.
const LOGO_SVG_INLINE = LOGO_SVG_TEXT
  .replace(/<\?xml[^>]*\?>/, '')
  .replace(/<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '');

const PORT = Number(process.env.PORT || 3001);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const API_KEY = process.env.API_KEY || ''; // optional bearer token for server-to-server
const CORS_ORIGINS = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const PUBLIC_BASE_URL = (process.env.PUBLIC_BASE_URL || 'https://tedxyola.com').replace(/\/$/, '');
const SHORT_PREFIX = process.env.SHORT_PREFIX || '/s';
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

// ---------- CORS ----------
// Allowlist-based. If CORS_ORIGINS is empty, no CORS headers are sent and
// browser cross-origin requests will fail (server-to-server still works).
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && CORS_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// ---------- helpers ----------
const SLUG_RE = /^[a-zA-Z0-9_-]{3,40}$/;
const randomSlug = (len = 6) => {
  const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
};
const buildShortUrl = (slug) => `${PUBLIC_BASE_URL}${SHORT_PREFIX}/${slug}`;

const timingSafeEqual = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

const requireAdmin = (req, res, next) => {
  // Option 1: Authorization: Bearer <API_KEY>  (server-to-server)
  const auth = req.headers.authorization || '';
  if (API_KEY && auth.startsWith('Bearer ')) {
    const presented = auth.slice('Bearer '.length).trim();
    if (timingSafeEqual(presented, API_KEY)) return next();
    return res.status(401).json({ error: 'invalid api key' });
  }

  // Option 2: session cookie (browser admin UI)
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
// "H" error correction tolerates ~30% obstruction, so a centred logo
// covering ~22% of the QR remains reliably scannable.
const QR_ERR_LEVEL = 'H';

app.get('/api/qr/:slug.png', async (req, res) => {
  const row = stmts.getBySlug.get(req.params.slug);
  if (!row) return res.status(404).send('not found');
  try {
    const size = Math.min(Math.max(Number(req.query.size) || 512, 128), 2048);
    const noLogo = req.query.logo === '0';

    const qrBuf = await QRCode.toBuffer(buildShortUrl(row.slug), {
      type: 'png',
      width: size,
      margin: 2,
      errorCorrectionLevel: QR_ERR_LEVEL,
      color: { dark: '#000000', light: '#FFFFFF' },
    });

    let outBuf = qrBuf;
    if (!noLogo) {
      const logoSize = Math.round(size * 0.22);
      const padSize = Math.round(logoSize * 1.18);
      const padRadius = Math.round(padSize * 0.18);

      const logoPng = await sharp(LOGO_SVG_BUF)
        .resize(logoSize, logoSize, { fit: 'contain' })
        .png()
        .toBuffer();

      const padSvg = Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${padSize}" height="${padSize}">` +
          `<rect width="${padSize}" height="${padSize}" rx="${padRadius}" fill="#FFFFFF"/>` +
          `</svg>`
      );

      outBuf = await sharp(qrBuf)
        .composite([
          { input: padSvg, gravity: 'center' },
          { input: logoPng, gravity: 'center' },
        ])
        .png()
        .toBuffer();
    }

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(outBuf);
  } catch (e) {
    console.error(e);
    res.status(500).send('qr error');
  }
});

app.get('/api/qr/:slug.svg', async (req, res) => {
  const row = stmts.getBySlug.get(req.params.slug);
  if (!row) return res.status(404).send('not found');
  try {
    const noLogo = req.query.logo === '0';
    let svg = await QRCode.toString(buildShortUrl(row.slug), {
      type: 'svg',
      margin: 2,
      errorCorrectionLevel: QR_ERR_LEVEL,
      color: { dark: '#000000', light: '#FFFFFF' },
    });

    if (!noLogo) {
      // qrcode emits an SVG with viewBox="0 0 N N" where N is module count + margins.
      const vbMatch = svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
      if (vbMatch) {
        const vb = parseFloat(vbMatch[1]);
        const logoSize = vb * 0.22;
        const padSize = logoSize * 1.18;
        const padRadius = padSize * 0.18;
        const cx = vb / 2;
        const cy = vb / 2;
        const overlay =
          `<rect x="${cx - padSize / 2}" y="${cy - padSize / 2}" ` +
            `width="${padSize}" height="${padSize}" rx="${padRadius}" fill="#FFFFFF"/>` +
          `<svg x="${cx - logoSize / 2}" y="${cy - logoSize / 2}" ` +
            `width="${logoSize}" height="${logoSize}" viewBox="${LOGO_VB}">` +
            LOGO_SVG_INLINE +
          `</svg>`;
        svg = svg.replace(/<\/svg>\s*$/, `${overlay}</svg>`);
      }
    }

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
  console.log(`API key auth: ${API_KEY ? 'enabled' : 'disabled'}`);
  console.log(`CORS origins: ${CORS_ORIGINS.length ? CORS_ORIGINS.join(', ') : '(none — same-origin only)'}`);
});
