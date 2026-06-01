# TEDxYola URL Shortener + QR API

Tiny Express + SQLite service. Endpoints:

- `POST /api/admin/login` — body `{ password }` → sets httpOnly cookie
- `POST /api/admin/logout`
- `GET  /api/admin/me` — session check
- `GET  /api/admin/links` — list all
- `POST /api/admin/links` — body `{ url, slug? }`; slug is `[A-Za-z0-9_-]{3,40}`
- `DELETE /api/admin/links/:slug`
- `GET  /api/qr/:slug.png` (`?size=512`) — PNG QR
- `GET  /api/qr/:slug.svg` — SVG QR
- `GET  /s/:slug` — 302 redirect + click counter

Listens on `127.0.0.1:3001`. Apache reverse-proxies `/api/*` and `/s/*` to it.

Created links look like: `https://tedxyola.com/s/abc123` or `https://tedxyola.com/s/early-bird`.

---

## One-time VPS setup (zero downtime — additive only)

Everything below is **additive**. No existing files or services are replaced.
Your live site keeps serving uninterrupted throughout.

SSH into the VPS first:

```bash
ssh tedxyola@<your-vps-ip>
```

### 1. Pull the latest code (you already do this for the site)

```bash
cd ~/tedxyola.com           # or wherever your repo lives on the VPS
git pull origin main
```

This brings down the new `server/` folder alongside everything else.

### 2. Copy the server folder to its own home

We keep the running service separate from the git checkout so updates and the
SQLite database stay clean.

```bash
mkdir -p ~/shortener
cp -r server/* ~/shortener/
cp server/.env.example ~/shortener/.env
cd ~/shortener
```

### 3. Install Node deps

```bash
node --version              # need 18+; install if missing
npm install --omit=dev
```

### 4. Fill in `.env` with real secrets

```bash
# generate a strong random JWT secret first:
openssl rand -hex 32

nano .env
```

Set:
```
ADMIN_PASSWORD=<pick a long password you'll remember>
JWT_SECRET=<paste the openssl output here>
PUBLIC_BASE_URL=https://tedxyola.com
SHORT_PREFIX=/s
PORT=3001
NODE_ENV=production
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

### 5. Smoke-test it manually

```bash
node server.js
```

You should see:
```
tedxyola-shortener listening on 127.0.0.1:3001
```

In a second terminal (or new SSH session):
```bash
curl http://127.0.0.1:3001/api/health
# {"ok":true}
```

`Ctrl+C` to stop the manual run.

### 6. Install the systemd service so it runs forever

```bash
sudo cp tedxyola-shortener.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now tedxyola-shortener
sudo systemctl status tedxyola-shortener
```

You should see `active (running)`. Verify again:
```bash
curl http://127.0.0.1:3001/api/health
```

The service auto-starts on reboot and restarts on crash. Up to this point, **nothing public has changed.** The live site is unaffected.

### 7. Make sure Apache proxy modules are enabled

```bash
sudo a2enmod proxy proxy_http
```

If they were already enabled, this is a no-op. If not, Apache will need a reload — but we'll do that in one shot after step 8.

### 8. Add the reverse-proxy lines to your tedxyola.com vhost

Find your vhost file (commonly `/etc/apache2/sites-available/tedxyola.com.conf` or `tedxyola.com-le-ssl.conf` for the HTTPS one). Edit the **HTTPS (port 443) `<VirtualHost>`** block:

```bash
sudo nano /etc/apache2/sites-available/tedxyola.com-le-ssl.conf
```

Inside the `<VirtualHost *:443>` block (above `</VirtualHost>`), paste:

```apache
  # URL shortener + admin API
  ProxyPreserveHost On
  ProxyPass        /api/  http://127.0.0.1:3001/api/
  ProxyPassReverse /api/  http://127.0.0.1:3001/api/
  ProxyPass        /s/    http://127.0.0.1:3001/s/
  ProxyPassReverse /s/    http://127.0.0.1:3001/s/
```

Save and exit.

### 9. Test the Apache config BEFORE reloading

```bash
sudo apachectl configtest
```

Must say `Syntax OK`. If it does not, **do not reload** — fix the error first. Your site stays up because Apache keeps running its existing config.

### 10. Graceful reload (zero downtime)

```bash
sudo systemctl reload apache2
```

`reload` finishes current requests on the old config, then switches new requests to the new one. No drop.

Verify externally from your laptop:
```bash
curl -I https://tedxyola.com/api/health
# HTTP/2 200 …
```

### 11. Deploy the frontend with the new /admin page

This is the same step you already do:

```bash
cd ~/tedxyola.com
git pull origin main       # already done in step 1, but safe to re-run
npm run build
rsync -av dist/ /home/tedxyola/public_html/
```

### 12. Done — log in

Open `https://tedxyola.com/admin` in your browser, enter the `ADMIN_PASSWORD` you set in step 4, create your first short link.

---

## Future updates (when you change server code)

```bash
ssh tedxyola@<your-vps-ip>
cd ~/tedxyola.com
git pull origin main

# Sync only the code files (leaves .env and data/ alone)
cp -r server/*.js server/package.json server/package-lock.json ~/shortener/ 2>/dev/null || true
cp -r server/*.js server/package.json ~/shortener/

cd ~/shortener
npm install --omit=dev
sudo systemctl restart tedxyola-shortener
```

Brief blip (~1 second) on `/api/*` and `/s/*` during restart. The static site is unaffected.

## Backup

The whole database is one file:

```bash
cp ~/shortener/data/links.db ~/backups/links-$(date +%F).db
```
