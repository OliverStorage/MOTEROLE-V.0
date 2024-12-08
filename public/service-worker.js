self.addEventListener('install', (event) => {
    console.log('Service Worker installed')
    // Cache files during install (if necessary)
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/index.html', // Add your critical files
                '/assets/main.js',
            ])
        }),
    )
})

self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['v1'] // Cache version
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (!cacheWhitelist.includes(cacheName)) {
                            return caches.delete(cacheName) // Clean old cache
                        }
                    }),
                )
            })
            .then(() => {
                self.clients.claim() // Take control of the page immediately
                // Notify the user if new version is available
                self.registration.showNotification('New Version Available!', {
                    body: 'The app has been updated. Refreshing...',
                })
                setTimeout(() => {
                    window.location.reload() // Force the refresh
                }, 3000) // Wait 3 seconds before forcing a reload
            }),
    )
})
