const CACHE_NAME = 'rapuneth-translator-v1';
const URLS_TO_CACHE = [
  '/rapuneth-translator/',
  '/rapuneth-translator/index.html',
  '/rapuneth-translator/manifest.json',
  '/rapuneth-translator/icons/icon-192.png',
  '/rapuneth-translator/icons/icon-512.png'
  // Add other assets: CSS, JS files if needed
];

// Install the service worker and cache all necessary files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate the service worker and clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch files from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
