// Service Worker for offline support and aggressive caching
const CACHE_VERSION = 'v1';
const CACHE_NAME = `tedxyola-${CACHE_VERSION}`;
const STATIC_CACHE = `tedxyola-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `tedxyola-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `tedxyola-images-${CACHE_VERSION}`;

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/logo-white.png',
  '/vite.svg',
];

// Install: Cache critical assets
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Precache failed:', err);
      });
    })
  );
  // Skip waiting to activate new service worker immediately
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            !cacheName.includes(CACHE_VERSION) &&
            cacheName.startsWith('tedxyola-')
          ) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// Fetch: Implement caching strategies
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip Google Forms and external APIs
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts')) {
    return;
  }

  // Image caching: Network first, fall back to cache
  if (request.destination === 'image') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache successful responses
          if (response.status === 200) {
            const cache = caches.open(IMAGE_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          // Fall back to cached image
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || new Response('Image not found', { status: 404 });
          });
        })
    );
    return;
  }

  // Font caching: Cache first, network fallback
  if (request.destination === 'font') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(request).then((response) => {
            return caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          })
        );
      })
    );
    return;
  }

  // HTML & JS: Network first with cache fallback (stale-while-revalidate)
  if (
    request.destination === 'document' ||
    request.destination === 'script' ||
    request.destination === 'style'
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const cache = caches.open(DYNAMIC_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Default: Network first
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.status === 200) {
          const cache = caches.open(DYNAMIC_CACHE);
          cache.then((c) => c.put(request, response.clone()));
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
