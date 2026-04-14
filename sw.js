const cacheName = 'creative-v1';
const assets = [
  '/my-first-app-/',
  '/my-first-app-/index.html',
  '/my-first-app-/style.css'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
