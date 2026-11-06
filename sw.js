const CACHE_NAME = 'ordago-ugt-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './mus.js',
  './manifest.json',
  './icono-192.png',
  './assets/ordago.svg',
  './assets/ugt.png',
  './assets/sanir.jpg',
  './install.js',
  './favicon.png',
  './apple-touch-icon.png',
  './icono-maskable-512.png',
  './icono-512.png',
  './assets/oros.png',
  './assets/copas.png',
  './assets/espadas.png',
  './assets/bastos.png',
  './assets/sota.png',
  './assets/caballo.png',
  './assets/rey.jpg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => (key.startsWith('ordago-ugt-') || key.startsWith('tecnimus-cache-')) && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
