import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import routes from "./router/routes";

const queryClient = new QueryClient();

// Service Worker Registration and Notification Setup
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered with scope:", registration.scope);

      // Request Notification Permissions
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notifications enabled.");
      } else {
        console.log("Notifications disabled.");
      }

      // Example: Show a test notification
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Welcome!", {
          body: "You have enabled notifications.",
          icon: "/icons/quenteh.png",
          badge: "/icons/quenteh.png",
          data: { url: "/" }, // Optional URL to navigate when clicked
        });
      });
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>
);
