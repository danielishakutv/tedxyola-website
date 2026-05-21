import { useCallback, useEffect, useRef, useState } from 'react';
import { Speaker } from '@/content/speakers';
import { fetchSpeakers, SpeakerQuery } from '@/services/speakersApi';
import { getCache, setCache } from '@/utils/caching';

// Cached data is served instantly for a snappy first paint, but we ALWAYS
// revalidate against the API on mount (stale-while-revalidate). That means any
// edit to the speakers in the admin shows up on the next visit/navigation, and
// the UI swaps in the fresh data only when it has actually changed.
const SPEAKERS_TTL_SECONDS = 60 * 60; // keep the instant-paint cache for 1 hour

export interface UseSpeakersResult {
  speakers: Speaker[];
  /** True only while we have no data yet and a request is in flight. */
  loading: boolean;
  error: Error | null;
  /** Force a fresh fetch (e.g. for a retry button). */
  refetch: () => void;
}

export const useSpeakers = (params?: SpeakerQuery): UseSpeakersResult => {
  // Stable cache key per query so different filters cache independently.
  const cacheKey = `speakers_${JSON.stringify(params ?? {})}`;

  // Keep the latest params/state in refs so the loader stays referentially
  // stable (depends only on cacheKey) without going stale.
  const paramsRef = useRef(params);
  paramsRef.current = params;

  const [speakers, setSpeakers] = useState<Speaker[]>(() => getCache(cacheKey) ?? []);
  const [loading, setLoading] = useState<boolean>(() => getCache(cacheKey) === null);
  const [error, setError] = useState<Error | null>(null);

  const speakersRef = useRef<Speaker[]>(speakers);
  speakersRef.current = speakers;

  const load = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const fresh = await fetchSpeakers(paramsRef.current, signal);
        if (signal?.aborted) return;
        setCache(cacheKey, fresh, SPEAKERS_TTL_SECONDS);
        // Only trigger a re-render when the data really changed.
        setSpeakers((prev) =>
          JSON.stringify(prev) === JSON.stringify(fresh) ? prev : fresh
        );
        setError(null);
      } catch (err) {
        if (signal?.aborted) return;
        // Keep showing cached data on failure; surface an error only if we
        // have nothing to display.
        if (speakersRef.current.length === 0) setError(err as Error);
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [cacheKey]
  );

  useEffect(() => {
    const controller = new AbortController();

    // Serve cached data immediately, then revalidate in the background.
    const cached = getCache(cacheKey);
    if (cached) {
      setSpeakers(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }

    load(controller.signal);
    return () => controller.abort();
  }, [cacheKey, load]);

  const refetch = useCallback(() => {
    if (speakersRef.current.length === 0) setLoading(true);
    load();
  }, [load]);

  return { speakers, loading, error, refetch };
};
