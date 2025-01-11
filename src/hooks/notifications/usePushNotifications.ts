import axios from "axios";

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const usePushNotifications = (access: string) => {
    console.log('access', access);
    
  const subscribeUserToPush = async () => {
    if (!("serviceWorker" in navigator)) {
      console.error("Service Workers are not supported in this browser.");
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    const subscription: any = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_PUBLIC_VAPID_KEY),
    });

    console.log("Push Subscription:", subscription);

    // Extract the necessary keys from the subscription object
    const subscriptionData = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.toJSON().keys.p256dh,
        auth: subscription.toJSON().keys.auth,
      },
    };

    // Send this subscription to your backend
    await axios.post(import.meta.env.VITE_NOTIFICATIONS_URL, subscriptionData, {
        headers: {
            Authorization: `JWT ${access}`
        }
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  subscribeUserToPush();
};

export default usePushNotifications;