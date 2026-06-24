const CACHE = 'superdog-shell-v1';

const SHELL = [
'./',
'./index.html',
'./manifest.json',
'./mascot.png',
'./frame1.png',
'./frame8.png',
'./icon192.svg',
'./icon512.svg'
];

self.addEventListener('install', e => {
e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
self.skipWaiting();
});

self.addEventListener('activate', e => {
e.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
)
);
});

self.addEventListener('fetch', e => {
const url = e.request.url;
// Story files — always fresh, never cached
if (//(2|3|4|5|6|7).(png|webp|jpg)latex
/i.test(url) || /.mp3

/i.test(url) ||
/.txt$/i.test(url)) {
e.respondWith(fetch(e.request).catch(() => new Response('')));
return;
}
// Shell — cache first
e.respondWith(
caches.match(e.request).then(r => r || fetch(e.request))
);
});