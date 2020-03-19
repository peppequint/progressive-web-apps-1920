const CORE_CACHE_VERSION = 'v1';
const CORE_ASSETS = ['/index.css'];

self.addEventListener('install', e => {
  console.log('Installing sw.');

  e.waitUntil(
    cache.open(CORE_CACHE_VERSION).then(cache => {
      return caches.addAll(CORE_ASSETS).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', e => {
  console.log('Activating sw.');

  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  console.log('Fetching sw.');

  console.log(e);
});
