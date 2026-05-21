// Client for the public, read-only TEDxYola Speaker API.
// Docs: https://speaker.tedxyola.com — no auth, CORS open, only LIVE speakers.

import { Speaker, SocialLink } from '@/content/speakers';

const API_BASE = 'https://speaker.tedxyola.com';

/** Raw speaker object as returned by the public API. */
export interface ApiSpeaker {
  id: string;
  name: string;
  jobTitle: string | null;
  company: string | null;
  talkTitle: string;
  description: string | null;
  bio: string | null;
  imageUrl: string | null;
  /** JSON string — array of { platform, url }. Must be parsed. */
  socialLinks: string | null;
  createdAt: string;
}

/** Filters supported by GET /api/public/speakers. */
export interface SpeakerQuery {
  /** Full-text search across name, talk title, company, role, and bio. */
  q?: string;
  /** Filter by company name (partial match). */
  company?: string;
  /** Sort order. Defaults to "newest" on the server. */
  sort?: 'newest' | 'oldest' | 'name';
  /** Max results to return (1–100). */
  limit?: number;
  /** Number of results to skip, for pagination. */
  offset?: number;
}

/** Parse the API's stringified socialLinks into a typed array. */
const parseSocialLinks = (raw: string | null): SocialLink[] | undefined => {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return undefined;
    const links: SocialLink[] = [];
    for (const item of parsed) {
      if (item && typeof item.platform === 'string' && typeof item.url === 'string') {
        links.push({ platform: item.platform, url: item.url });
      }
    }
    return links.length ? links : undefined;
  } catch {
    return undefined;
  }
};

/** Map the API response shape onto the Speaker shape used across the site. */
export const mapApiSpeaker = (api: ApiSpeaker): Speaker => ({
  id: api.id,
  name: api.name,
  title: api.jobTitle ?? '',
  company: api.company ?? undefined,
  photo: api.imageUrl ?? '',
  talkTitle: api.talkTitle,
  talkSummary: api.description ?? '',
  bio: api.bio ?? '',
  socialLinks: parseSocialLinks(api.socialLinks),
});

const buildQueryString = (params: SpeakerQuery = {}): string => {
  const search = new URLSearchParams();
  if (params.q) search.set('q', params.q);
  if (params.company) search.set('company', params.company);
  if (params.sort) search.set('sort', params.sort);
  if (typeof params.limit === 'number') search.set('limit', String(params.limit));
  if (typeof params.offset === 'number') search.set('offset', String(params.offset));
  const qs = search.toString();
  return qs ? `?${qs}` : '';
};

/** Fetch the list of LIVE speakers, mapped to the site's Speaker shape. */
export const fetchSpeakers = async (
  params?: SpeakerQuery,
  signal?: AbortSignal
): Promise<Speaker[]> => {
  const res = await fetch(
    `${API_BASE}/api/public/speakers${buildQueryString(params)}`,
    { signal }
  );
  if (!res.ok) throw new Error(`Failed to load speakers (${res.status})`);
  const data: unknown = await res.json();
  return Array.isArray(data) ? data.map((s) => mapApiSpeaker(s as ApiSpeaker)) : [];
};

/** Fetch a single LIVE speaker by id. Returns null if not found / not LIVE. */
export const fetchSpeaker = async (
  id: string,
  signal?: AbortSignal
): Promise<Speaker | null> => {
  const res = await fetch(
    `${API_BASE}/api/public/speakers/${encodeURIComponent(id)}`,
    { signal }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load speaker (${res.status})`);
  const data = (await res.json()) as ApiSpeaker;
  return mapApiSpeaker(data);
};
