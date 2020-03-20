const CORE_CACHE_VERSION = 'v1';
const CORE_ASSETS = ['/index.css'];

self.addEventListener('install', e => {
  console.log('Installing sw.');

  e.waitUntil(
    caches.open(CORE_CACHE_VERSION).then(cache => {
      return cache.addAll(CORE_ASSETS).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', e => {
  console.log('Activating sw.');

  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  console.log('Fetching sw.');

  // e.respondWith(caches.open(CORE_CACHE_VERSION).then(cache => console.log(e.request.url)));
});
