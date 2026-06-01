# TEDxYola URL Shortener + QR API

Tiny Express + SQLite service. Serves:

- `POST /api/admin/login` — body `{ password }` → sets httpOnly cookie
- `POST /api/admin/logout`
- `GET  /api/admin/me` — session check
- `GET  /api/admin/links` — list all
- `POST /api/admin/links` — body `{ url, slug? }`; slug is `[A-Za-z0-9_-]{3,40}`
- `DELETE /api/admin/links/:slug`
- `GET  /api/qr/:slug.png` (`?size=512`) — PNG QR
- `GET  /api/qr/:slug.svg` — SVG QR
- `GET  /8fub3h/:slug` — 302 redirect + click counter

Listens on `127.0.0.1:3001`. Apache reverse-proxies `/api/*` and `/8fub3h/*` to it.

## First-time setup on the VPS

```bash
# 1. Install Node 20+ if not present
node --version

# 2. Copy server files to the VPS (run on your laptop)
rsync -av --exclude node_modules --exclude data --exclude .env \
  server/ tedxyola@your-vps:/home/tedxyola/shortener/

# 3. SSH in and install deps
ssh tedxyola@your-vps
cd /home/tedxyola/shortener
npm install --omit=dev

# 4. Create .env (use long random values!)
cp .env.example .env
nano .env
#   ADMIN_PASSWORD=<long random>
#   JWT_SECRET=<openssl rand -hex 32>

# 5. Install systemd unit (as root)
sudo cp tedxyola-shortener.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now tedxyola-shortener
sudo systemctl status tedxyola-shortener

# 6. Confirm it responds locally
curl http://127.0.0.1:3001/api/health
```

## Apache reverse-proxy (add to the tedxyola.com vhost)

```apache
<IfModule mod_proxy.c>
  ProxyPreserveHost On
  ProxyPass        /api/      http://127.0.0.1:3001/api/
  ProxyPassReverse /api/      http://127.0.0.1:3001/api/
  ProxyPass        /8fub3h/   http://127.0.0.1:3001/8fub3h/
  ProxyPassReverse /8fub3h/   http://127.0.0.1:3001/8fub3h/
</IfModule>
```

Enable modules: `sudo a2enmod proxy proxy_http && sudo systemctl reload apache2`.

## Updates

```bash
rsync -av --exclude node_modules --exclude data --exclude .env \
  server/ tedxyola@your-vps:/home/tedxyola/shortener/
ssh tedxyola@your-vps "cd /home/tedxyola/shortener && npm install --omit=dev && sudo systemctl restart tedxyola-shortener"
```

## Backup

The whole database is one file: `/home/tedxyola/shortener/data/links.db`.
Copy it with `rsync` or `scp` anywhere safe.
