const CACHE_NAME = "compra-casa-rural-v1";
const urlsToCache = ["/", "/index.html", "/styles.css", "/manifest.json"];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response;
      }

      // For Google Sheets CSV, always try network first
      if (event.request.url.includes("docs.google.com")) {
        return fetch(event.request).catch(() => {
          // If network fails, show offline message
          return new Response("Datos no disponibles sin conexión", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
      }

      return fetch(event.request);
    })
  );
});

// Handle background sync for offline functionality
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Here you could sync offline data when connection is restored
      console.log("Background sync triggered")
    );
  }
});

// Handle push notifications (if needed in the future)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Nueva actualización disponible",
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="64" fill="%23667eea"/><text x="256" y="350" font-size="280" text-anchor="middle" fill="white">🛒</text></svg>',
    badge:
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🛒</text></svg>',
    tag: "compra-update",
    requireInteraction: true,
  };

  event.waitUntil(
    self.registration.showNotification("Gestión de Compras", options)
  );
});
