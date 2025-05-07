
self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        'ricerca_brani_pwa.html',
        'manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
