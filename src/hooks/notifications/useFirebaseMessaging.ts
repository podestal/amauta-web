// src/hooks/useFirebaseMessaging.ts
import { useEffect, useState } from "react";
import { messaging, getToken, onMessage } from '../../firebaseConfig';

const useFirebaseMessaging = () => {
  const [deviceToken, setDeviceToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceToken = async () => {
      try {
        const token = await getToken(messaging, { vapidKey: "YOUR_PUBLIC_VAPID_KEY" });
        if (token) {
          setDeviceToken(token);
          console.log("Device token:", token);
        } else {
          console.warn("No registration token available. Request permission to generate one.");
        }
      } catch (error) {
        console.error("Error fetching device token:", error);
      }
    };

    fetchDeviceToken();

    // Listen for foreground messages
    onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);
      // Optionally: show notification or update state
    });
  }, []);

  return deviceToken;
};

export default useFirebaseMessaging;
