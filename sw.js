self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('dacapo-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/login.html',
                '/signup.html',
                '/profile.html',
                '/styles.css',
                '/app.js',
                '/login.js',
                '/signup.js',
                '/profile.js',
                '/manifest.json',
                '/icon-192.png',
                '/icon-512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
