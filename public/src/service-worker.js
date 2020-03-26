const CORE_CACHE_VERSION = 'cache-storage';
const CORE_ASSETS = ['/index.css', 'index.js', '/offline', '/manifest.json'];

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
  const request = e.request;
  if (request.method === 'GET' && CORE_ASSETS.includes(pathName(request.url))) {
    e.respondWith(caches.open(CORE_CACHE_VERSION).then(cache => cache.match(e.request.url)));
  } else if (request.method === 'GET' && request.headers.get('accept') !== null && request.headers.get('accept').indexOf('text/html') > -1) {
    e.respondWith(
      caches
        .open(CORE_CACHE_VERSION)
        .then(cache => cache.match(e.request.url))
        .then(res => (res ? res : cloneReq(e.request, 'html-cache')))
        .catch(e => {
          return caches.open(CORE_CACHE_VERSION).then(cache => cache.match('/offline'));
        })
    );
  }
});

function cloneReq(req, cache) {
  return fetch(req).then(res => {
    if (!res.ok) {
      throw new TypeError('Bad response');
    }

    const clone = response.clone();
    caches.open(cache).then(cache => cache.put(req, clone));
    return response;
  });
}

function pathName(request) {
  const url = new URL(request);
  return url.pathname;
}
