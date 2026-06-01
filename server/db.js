import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = process.env.DB_PATH || path.join(dataDir, 'links.db');
export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS links (
    slug         TEXT PRIMARY KEY,
    target_url   TEXT NOT NULL,
    created_at   INTEGER NOT NULL,
    clicks       INTEGER NOT NULL DEFAULT 0,
    last_click   INTEGER
  );
  CREATE INDEX IF NOT EXISTS idx_links_created_at ON links(created_at DESC);
`);

export const stmts = {
  insert: db.prepare(
    'INSERT INTO links (slug, target_url, created_at) VALUES (?, ?, ?)'
  ),
  getBySlug: db.prepare('SELECT * FROM links WHERE slug = ?'),
  listAll: db.prepare('SELECT * FROM links ORDER BY created_at DESC LIMIT 500'),
  bumpClick: db.prepare(
    'UPDATE links SET clicks = clicks + 1, last_click = ? WHERE slug = ?'
  ),
  deleteBySlug: db.prepare('DELETE FROM links WHERE slug = ?'),
};
