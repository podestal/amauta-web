import { useEffect } from "react";
import useFirebaseMessaging from "./useFirebaseMessaging";
import { getDeviceType } from "../../utils/getDeviceType";
import axios from "axios";

const useRegisterDeviceToken = (access: string) => {
  const deviceToken = useFirebaseMessaging();
  const deviceType = getDeviceType();

  useEffect(() => {
    if (deviceToken) {
      const registerDevice = async () => {
        try {
          await axios.post(
            import.meta.env.VITE_FCM_URL,
            {
              device_token: deviceToken,
              device_type: deviceType,
            },
            {
              headers: {
                Authorization: `JWT ${access}`, // Adjust authentication mechanism
              },
            }
          );
          console.log("Device token registered successfully!");
        } catch (error) {
          console.error("Error registering device token:", error);
        }
      };

      registerDevice();
    }
  }, [deviceToken, deviceType]);
};

export default useRegisterDeviceToken;
