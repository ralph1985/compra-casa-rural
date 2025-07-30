// CLEANUP SERVICE WORKER - This will delete all caches and then unregister itself
const CLEANUP_CACHE_NAME = "cleanup-sw-2025-07-30-03";

// Install event - immediately activate without caching anything
self.addEventListener("install", (event) => {
  console.log("🧹 Cleanup SW: Installing and skipping waiting");
  self.skipWaiting();
});

// Activate event - delete ALL caches and then unregister
self.addEventListener("activate", (event) => {
  console.log("🧹 Cleanup SW: Activating and cleaning all caches");

  event.waitUntil(
    Promise.all([
      // Delete ALL existing caches
      caches.keys().then((cacheNames) => {
        console.log("🧹 Found caches to delete:", cacheNames);
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log("🧹 Deleting cache:", cacheName);
            return caches.delete(cacheName);
          })
        );
      }),

      // Take control of all clients immediately
      self.clients.claim(),
    ]).then(() => {
      console.log("🧹 All caches deleted, now unregistering SW");

      // Wait a bit and then unregister this service worker
      setTimeout(() => {
        self.registration.unregister().then((success) => {
          if (success) {
            console.log("🧹 Cleanup SW successfully unregistered");
          } else {
            console.log("🧹 Cleanup SW unregistration failed");
          }
        });
      }, 1000);
    })
  );
});

// Fetch event - serve everything from network (no caching)
self.addEventListener("fetch", (event) => {
  // Always go to network, never serve from cache
  event.respondWith(
    fetch(event.request).catch((error) => {
      console.log("🧹 Fetch failed:", error);
      // For Google Sheets CSV, return a simple error response
      if (event.request.url.includes("docs.google.com")) {
        return new Response("Datos no disponibles sin conexión", {
          status: 503,
          statusText: "Service Unavailable",
        });
      }
      throw error;
    })
  );
});

// Handle messages from main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.command === "skipWaiting") {
    console.log("🧹 Received skipWaiting command");
    self.skipWaiting();
  }
});

console.log(
  "🧹 Cleanup Service Worker loaded - will delete all caches and unregister itself"
);
