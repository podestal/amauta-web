import { useEffect } from "react";
import { getDeviceType } from "../../utils/getDeviceType";
import axios from "axios";

interface Props {
    deviceToken: string;
    access: string;
}

const useRegisterDeviceToken = ({ deviceToken, access }: Props) => {
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
                Authorization: `JWT ${access}`, 
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
