
const CACHE_NAME = 'ricerca-brani-cache-v4';
const urlsToCache = [
  '/ricerca-brani-miniapp/',
  '/ricerca-brani-miniapp/index.html',
  '/ricerca-brani-miniapp/manifest.json',
  '/ricerca-brani-miniapp/icon-192.png',
  '/ricerca-brani-miniapp/icon-512.png'
];

// Installazione
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Attivazione
self.addEventListener('activate', event => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Intercetta fetch
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match('/ricerca-brani-miniapp/index.html')
      )
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
