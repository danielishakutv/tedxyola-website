import { useEffect, useState } from 'react';

export type PopupFrequency =
  | 'EVERY_VISIT'
  | 'ONCE_PER_SESSION'
  | 'ONCE_PER_DAY'
  | 'ONCE_EVER';

export type Popup = {
  id: string;
  title: string;
  body: string;
  buttonLabel?: string | null;
  buttonUrl?: string | null;
  imageUrl?: string | null;
  frequency: PopupFrequency;
  priority: number;
  startAt?: string | null;
  endAt?: string | null;
};

const API_BASE = 'https://speaker.tedxyola.com';
const STORAGE_PREFIX = 'tedx_popup_';

export async function fetchActivePopups(signal?: AbortSignal): Promise<Popup[]> {
  const res = await fetch(`${API_BASE}/api/public/popups/active`, { signal });
  if (!res.ok) throw new Error(`Popups API ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export function trackView(id: string): void {
  // Best-effort, fire-and-forget.
  fetch(`${API_BASE}/api/public/popups/${id}/view`, {
    method: 'POST',
    keepalive: true,
  }).catch(() => {});
}

export function trackClick(id: string): void {
  fetch(`${API_BASE}/api/public/popups/${id}/click`, {
    method: 'POST',
    keepalive: true,
  }).catch(() => {});
}

function storageKey(id: string) {
  return STORAGE_PREFIX + id;
}

export function shouldShow(p: Popup): boolean {
  try {
    const key = storageKey(p.id);
    if (p.frequency === 'EVERY_VISIT') return true;

    if (p.frequency === 'ONCE_PER_SESSION') {
      return !sessionStorage.getItem(key);
    }

    const seen = localStorage.getItem(key);
    if (p.frequency === 'ONCE_EVER') return !seen;
    if (p.frequency === 'ONCE_PER_DAY') {
      if (!seen) return true;
      const ts = Number(seen);
      if (Number.isNaN(ts)) return true;
      return Date.now() - ts > 86_400_000;
    }
    return true;
  } catch {
    return true;
  }
}

export function markShown(p: Popup): void {
  try {
    const key = storageKey(p.id);
    sessionStorage.setItem(key, '1');
    if (p.frequency === 'ONCE_PER_DAY' || p.frequency === 'ONCE_EVER') {
      localStorage.setItem(key, String(Date.now()));
    }
  } catch {
    /* ignore storage errors (private mode, quota) */
  }
}

export function useActivePopups() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchActivePopups(ctrl.signal)
      .then(setPopups)
      .catch(() => setPopups([]))
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  return { popups, loading };
}
