const usePushNotifications = () => {
  const subscribeUserToPush = async () => {
    if (!("serviceWorker" in navigator)) {
      console.error("Service Workers are not supported in this browser.");
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_PUBLIC_VAPID_KEY, 
    });

    console.log("Push Subscription:", subscription);
    // Send this subscription to your backend
    await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });
  };

  return { subscribeUserToPush };
};

export default usePushNotifications;
