importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    workbox.precaching.precacheAndRoute([
        // HTML
        {url: '/index.html', revision: '1'},
        {url: '/detail-team.html', revision: '1'},
        {url: '/nav.html', revision: '1'},
        // CSS
        {url: '/css/materialize.min.css', revision: '1'},
        {url: '/css/style.css', revision: '1'},
        // JS
        {url: '/push.js', revision: '1'},
        {url: '/service-worker.js', revision: '1'},
        {url: '/js/api.js', revision: '1'},
        {url: '/js/db.js', revision: '1'},
        {url: '/js/idb.js', revision: '1'},
        {url: '/js/materialize.min.js', revision: '1'},
        {url: '/js/nav.js', revision: '1'},
        {url: '/js/script.js', revision: '1'},
        // JSON
        {url: '/manifest.json', revision: '1'},
        // Images
        {url: '/images/logo.png', revision: '1'},
        // Icons
        {url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1'},
    ], {
        ignoreUrlParametersMatching: [/.*/]
    });

    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );
    
    workbox.routing.registerRoute(
        new RegExp('/images/icons/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'icons'
        })
    );
    
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'api'
        })
    );

    console.log('Workbox berhasil dimuat');
} else {
    console.log('Workbox gagal dimuat');
}

self.addEventListener('push', function (e) {
    let body;
    if (e.data) {
        body = e.data.text();
    } else {
        body = 'Push message no Payload';
    }

    let options = {
        body: body,
        icon: '/images/logo.png',
        vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    e.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});