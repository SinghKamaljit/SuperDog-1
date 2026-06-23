const CACHE_NAME = 'superdog-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon192.svg',
  'icon512.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});