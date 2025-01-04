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
  