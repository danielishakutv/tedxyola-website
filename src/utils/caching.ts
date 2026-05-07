// Strategic caching utilities for optimal performance

// In-memory cache for fast access
const memoryCache = new Map<string, { data: any; expires: number }>();

/**
 * Cache data with TTL
 */
export const setCache = (key: string, data: any, ttlSeconds = 3600) => {
  const expires = Date.now() + ttlSeconds * 1000;
  memoryCache.set(key, { data, expires });

  // Also store in localStorage for persistence across sessions
  try {
    localStorage.setItem(
      `cache_${key}`,
      JSON.stringify({ data, expires })
    );
  } catch (e) {
    console.warn('localStorage not available:', e);
  }
};

/**
 * Get cached data if not expired
 */
export const getCache = (key: string) => {
  // Check memory cache first (faster)
  const memCached = memoryCache.get(key);
  if (memCached && memCached.expires > Date.now()) {
    return memCached.data;
  }

  // Fall back to localStorage
  try {
    const stored = localStorage.getItem(`cache_${key}`);
    if (stored) {
      const { data, expires } = JSON.parse(stored);
      if (expires > Date.now()) {
        // Restore to memory cache
        memoryCache.set(key, { data, expires });
        return data;
      } else {
        // Remove expired cache
        localStorage.removeItem(`cache_${key}`);
        memoryCache.delete(key);
      }
    }
  } catch (e) {
    console.warn('localStorage read failed:', e);
  }

  return null;
};

/**
 * Clear specific cache
 */
export const clearCache = (key: string) => {
  memoryCache.delete(key);
  try {
    localStorage.removeItem(`cache_${key}`);
  } catch (e) {
    console.warn('localStorage clear failed:', e);
  }
};

/**
 * Clear all cache
 */
export const clearAllCache = () => {
  memoryCache.clear();
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (e) {
    console.warn('localStorage clear all failed:', e);
  }
};

/**
 * Stale-while-revalidate pattern: Return cached data immediately, then update in background
 */
export const staleWhileRevalidate = async (
  key: string,
  fetchFn: () => Promise<any>,
  ttlSeconds = 3600
) => {
  // Return cached data if available
  const cached = getCache(key);
  if (cached !== null) {
    // Update in background without blocking
    fetchFn()
      .then((data) => {
        setCache(key, data, ttlSeconds);
      })
      .catch((err) => {
        console.warn('Background update failed:', err);
      });

    return cached;
  }

  // No cache, fetch and cache
  const data = await fetchFn();
  setCache(key, data, ttlSeconds);
  return data;
};

/**
 * Cache form data to recover after page reload
 */
export const cacheFormData = (formId: string, data: Record<string, any>) => {
  setCache(`form_${formId}`, data, 1800); // 30 minutes
};

/**
 * Recover cached form data
 */
export const recoverFormData = (formId: string) => {
  return getCache(`form_${formId}`);
};

/**
 * Clear form data cache
 */
export const clearFormCache = (formId: string) => {
  clearCache(`form_${formId}`);
};

/**
 * Index DB for large data sets
 */
export const initIndexDB = async (dbName = 'tedxyola') => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('gallery')) {
        db.createObjectStore('gallery', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('speakers')) {
        db.createObjectStore('speakers', { keyPath: 'id' });
      }
    };
  });
};

/**
 * Store data in IndexedDB for large datasets
 */
export const storeInIndexDB = async (
  storeName: string,
  data: any,
  dbName = 'tedxyola'
) => {
  try {
    const db = await initIndexDB(dbName);
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    store.clear();
    store.add(data);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve(true);
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (e) {
    console.warn('IndexDB store failed:', e);
  }
};

/**
 * Retrieve data from IndexedDB
 */
export const getFromIndexDB = async (
  storeName: string,
  key?: string,
  dbName = 'tedxyola'
) => {
  try {
    const db = await initIndexDB(dbName);
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = key ? store.get(key) : store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.warn('IndexDB get failed:', e);
  }
};
