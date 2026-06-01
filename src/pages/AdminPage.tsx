import { FormEvent, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Link2,
  Lock,
  LogOut,
  Loader2,
  Copy,
  Check,
  Trash2,
  Download,
  QrCode,
  ExternalLink,
  Plus,
} from 'lucide-react';

type LinkRow = {
  slug: string;
  target_url: string;
  short_url: string;
  created_at: number;
  clicks: number;
  last_click?: number | null;
};

const api = async (path: string, init?: RequestInit) => {
  const res = await fetch(path, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
};

const formatDate = (ms: number) =>
  new Date(ms).toLocaleString('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------
const LoginForm = ({ onLoggedIn }: { onLoggedIn: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await api('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
      onLoggedIn();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="w-full max-w-sm bg-white text-gray-900 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-10 h-10 rounded-xl bg-ted-red/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-ted-red" />
          </span>
          <div>
            <h1 className="text-xl font-bold">Admin</h1>
            <p className="text-sm text-gray-500">TEDxYola short links</p>
          </div>
        </div>

        <label htmlFor="pw" className="block text-sm font-semibold mb-2">
          Password
        </label>
        <input
          id="pw"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ted-red"
        />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={busy || !password}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 disabled:opacity-60"
        >
          {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign in'}
        </button>
      </motion.form>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------
const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-gray-600 hover:text-ted-red hover:bg-gray-100"
      title="Copy"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};

const LinkRowView = ({
  row,
  onDelete,
}: {
  row: LinkRow;
  onDelete: (slug: string) => void;
}) => {
  const [showQR, setShowQR] = useState(false);
  return (
    <li className="p-5 border border-gray-200 rounded-2xl bg-white">
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <a
              href={row.short_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-semibold text-ted-red hover:underline break-all"
            >
              {row.short_url}
            </a>
            <CopyButton value={row.short_url} />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 break-all">
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            <a
              href={row.target_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 break-all"
            >
              {row.target_url}
            </a>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex gap-4 flex-wrap">
            <span>{row.clicks} {row.clicks === 1 ? 'click' : 'clicks'}</span>
            <span>Created {formatDate(row.created_at)}</span>
            {row.last_click && <span>Last {formatDate(row.last_click)}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowQR((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium hover:border-ted-red hover:text-ted-red"
          >
            <QrCode className="w-4 h-4" />
            {showQR ? 'Hide QR' : 'QR'}
          </button>
          <button
            type="button"
            onClick={() => onDelete(row.slug)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-red-600 hover:border-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showQR && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-6">
          <img
            src={`/api/qr/${row.slug}.png?size=320`}
            alt={`QR for ${row.slug}`}
            className="w-40 h-40 rounded-xl border border-gray-200"
          />
          <div className="flex flex-col gap-2">
            <a
              href={`/api/qr/${row.slug}.png?size=1024`}
              download={`tedxyola-${row.slug}.png`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-ted-red text-white rounded-full font-semibold text-sm hover:bg-red-700"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </a>
            <a
              href={`/api/qr/${row.slug}.svg`}
              download={`tedxyola-${row.slug}.svg`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full font-semibold text-sm hover:border-ted-red hover:text-ted-red"
            >
              <Download className="w-4 h-4" />
              Download SVG
            </a>
          </div>
        </div>
      )}
    </li>
  );
};

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api('/api/admin/links');
      setLinks(data.links || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      const body: Record<string, string> = { url: url.trim() };
      if (slug.trim()) body.slug = slug.trim();
      await api('/api/admin/links', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      setUrl('');
      setSlug('');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'failed');
    } finally {
      setCreating(false);
    }
  };

  const remove = async (s: string) => {
    if (!confirm(`Delete /${s}? This cannot be undone.`)) return;
    try {
      await api(`/api/admin/links/${encodeURIComponent(s)}`, { method: 'DELETE' });
      await refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'failed');
    }
  };

  const logout = async () => {
    try {
      await api('/api/admin/logout', { method: 'POST' });
    } finally {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-ted-red flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </span>
            <div>
              <h1 className="font-bold leading-tight">Short Links</h1>
              <p className="text-xs text-white/60">TEDxYola admin</p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Create */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-1">Create a short link</h2>
          <p className="text-sm text-gray-500 mb-5">
            Short URL format: <code className="font-mono">tedxyola.com/8fub3h/your-slug</code>.
            Leave the slug blank to auto-generate one.
          </p>
          <form onSubmit={create} className="grid sm:grid-cols-[1fr_240px_auto] gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                Destination URL
              </label>
              <input
                type="url"
                required
                placeholder="https://example.com/long/path?ref=…"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ted-red"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                Custom slug (optional)
              </label>
              <input
                type="text"
                placeholder="my-link"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                pattern="[a-zA-Z0-9_\-]{3,40}"
                title="3–40 chars: letters, numbers, hyphen, underscore"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ted-red font-mono"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={creating || !url}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-ted-red text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-60"
              >
                {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                Create
              </button>
            </div>
          </form>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </section>

        {/* List */}
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-lg font-bold">Your links</h2>
            <span className="text-sm text-gray-500">{links.length} total</span>
          </div>
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
              Loading…
            </div>
          ) : links.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-2xl">
              No links yet. Create your first one above.
            </div>
          ) : (
            <ul className="space-y-3">
              {links.map((row) => (
                <LinkRowView key={row.slug} row={row} onDelete={remove} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Page shell — decides login vs dashboard
// ---------------------------------------------------------------------------
export const AdminPage = () => {
  const [state, setState] = useState<'loading' | 'login' | 'in'>('loading');

  const check = useCallback(async () => {
    try {
      await api('/api/admin/me');
      setState('in');
    } catch {
      setState('login');
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }
  if (state === 'login') return <LoginForm onLoggedIn={() => setState('in')} />;
  return <Dashboard onLogout={() => setState('login')} />;
};
