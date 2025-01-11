// sw.js

self.addEventListener("install", (event) => {
    console.log("Service Worker installing.");
    // Cache assets or perform other install-time tasks
  });
  
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
  // Clean up old caches, etc.
});
  
self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  // Handle fetch events (e.g., serve cached files)
});


self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Push received:", data);

  const options = {
    body: data.body,
    icon: "/icons/quenteh.png",
    badge: "/icons/quenteh.png",
    data: data.url || "/", // optional URL to open when notification is clicked
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Notification", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification
  const url = event.notification.data; // Retrieve the URL
  event.waitUntil(clients.openWindow(url)); // Open the URL in a new tab
});
