import axios from "axios";

const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
  
    return outputArray;
  };
  

const usePushNotifications = (access: string) => {
  const subscribeUserToPush = async () => {
    if (!("serviceWorker" in navigator)) {
      console.error("Service Workers are not supported in this browser.");
      return;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        console.log("Service Worker is ready:", registration);
      
        const publicKey = import.meta.env.VITE_PUBLIC_VAPID_KEY;
        console.log("Public VAPID Key:", publicKey);
      
        const applicationServerKey = urlBase64ToUint8Array(publicKey);
        console.log("Application Server Key:", applicationServerKey);
      
        const subscription: any = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });
        console.log("Push Subscription Success:", subscription);

      console.log("Push Subscription:", subscription);

      const subscriptionData = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.toJSON().keys.p256dh,
          auth: subscription.toJSON().keys.auth,
        },
      };

      await axios.post(import.meta.env.VITE_NOTIFICATIONS_URL, subscriptionData, {
        headers: {
          Authorization: `JWT ${access}`,
        },
      });

      console.log("Push subscription sent to server.");
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
    }
  };

  subscribeUserToPush();
};

export default usePushNotifications;
