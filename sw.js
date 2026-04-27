// NYC Driver Tracker - Service Worker
// Strategy:
//   - HTML / app.js: network-first (always try fresh, fall back to cache offline)
//   - React CDN: cache-first (large, rarely changes)
//   - Everything else (Google Drive API, OAuth): never cached, always network
//
// Bump CACHE_VERSION whenever you change this file's caching logic.
// The actual app.js cache busts via its ?v=N query string.

const CACHE_VERSION = 'nyc-driver-v7';

// Things we precache on install (so the app works offline immediately after first visit)
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './app.js?v=102',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://unpkg.com/react@18.3.1/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js',
];

// Domains we deliberately never cache (live data, auth)
const NEVER_CACHE_HOSTS = [
  'googleapis.com',
  'google.com',
  'gstatic.com',
  'accounts.google.com',
  'api.anthropic.com',
  'browser.sentry-cdn.com',
  'sentry.io',
];

// === Install: precache core assets, take over immediately ===
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) {
        // Use individual addAll-with-fallback so one missing file doesn't break the whole install
        return Promise.all(
          PRECACHE_ASSETS.map(function (url) {
            return cache.add(url).catch(function (err) {
              console.warn('[sw] failed to precache', url, err);
            });
          })
        );
      })
      .then(function () { return self.skipWaiting(); })
  );
});

// === Activate: clean up old caches, claim all open tabs ===
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys.filter(function (k) { return k !== CACHE_VERSION; })
              .map(function (k) {
                console.log('[sw] deleting old cache:', k);
                return caches.delete(k);
              })
        );
      })
      .then(function () { return self.clients.claim(); })
  );
});// === Fetch: route by request type ===
self.addEventListener('fetch', function (e) {
  const req = e.request;

  // Only handle GET. POST/PUT/DELETE go straight to network.
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never cache live API / auth endpoints
  if (NEVER_CACHE_HOSTS.some(function (host) { return url.hostname.indexOf(host) >= 0; })) {
    return; // browser handles normally, no SW interception
  }

  // React from unpkg → cache-first (rarely changes for a pinned version)
  if (url.hostname === 'unpkg.com') {
    e.respondWith(cacheFirst(req));
    return;
  }

  // Google Fonts → cache-first (CSS and font files almost never change)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(cacheFirst(req));
    return;
  }

  // Same-origin (HTML, app.js, manifest, icons) → network-first
  if (url.origin === self.location.origin) {
    e.respondWith(networkFirst(req));
    return;
  }

  // Anything else → just network, don't cache
});

function networkFirst(req) {
  return fetch(req)
    .then(function (resp) {
      // Only cache successful, basic responses
      if (resp && resp.status === 200) {
        const respClone = resp.clone();
        caches.open(CACHE_VERSION).then(function (cache) {
          cache.put(req, respClone);
        });
      }
      return resp;
    })
    .catch(function () {
      // Offline: fall back to cached copy if any
      return caches.match(req).then(function (cached) {
        return cached || new Response('Offline and no cached copy', { status: 503 });
      });
    });
}

function cacheFirst(req) {
  return caches.match(req).then(function (cached) {
    if (cached) return cached;
    return fetch(req).then(function (resp) {
      if (resp && resp.status === 200) {
        const respClone = resp.clone();
        caches.open(CACHE_VERSION).then(function (cache) {
          cache.put(req, respClone);
        });
      }
      return resp;
    });
  });
}

// === Allow page to trigger immediate update ===
// Page sends { type: 'SKIP_WAITING' } to apply a new SW without closing tabs.
self.addEventListener('message', function (e) {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
