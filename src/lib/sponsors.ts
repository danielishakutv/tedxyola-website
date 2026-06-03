import { useEffect, useState } from 'react';

export type Sponsor = {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  website?: string;
  createdAt?: string;
};

const API_BASE = 'https://speaker.tedxyola.com';

export async function fetchSponsors(signal?: AbortSignal): Promise<Sponsor[]> {
  const res = await fetch(`${API_BASE}/api/public/sponsors`, { signal });
  if (!res.ok) throw new Error(`Sponsors API ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchSponsor(id: string, signal?: AbortSignal): Promise<Sponsor> {
  const res = await fetch(`${API_BASE}/api/public/sponsors/${id}`, { signal });
  if (!res.ok) throw new Error(`Sponsor API ${res.status}`);
  return res.json();
}

export function useSponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetchSponsors(ctrl.signal)
      .then((data) => {
        setSponsors(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  return { sponsors, loading, error };
}
