import useAuthStore from "../../hooks/store/useAuthStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useGetProfileStore from "../../hooks/store/useGetProfileStore";
import useLoader from "../../hooks/ui/useLoader";
import useGetUser from "../../hooks/auth/useGetUser";
import useGetProfile from "../../hooks/api/profile/useGetProfile";
import isTokenExpired from "../../utils/isTokenExpired";
import useFirebaseMessaging from "../../hooks/notifications/useFirebaseMessaging";
import axios from "axios";
import { getDeviceType } from "../../utils/getDeviceType";

interface Props {
  children: React.ReactElement;
}

const PrivateRoutes = ({ children }: Props) => {
  
  const access = useAuthStore((s) => s.access) || ''
  const tokenExpired = isTokenExpired(access)
  const {setUser, setProfile} = useGetProfileStore()
  const deviceToken = useFirebaseMessaging()
  const {data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser} = useGetUser({ access });
  const {data: profile, isLoading: isLoadingProfile, isError: isErrorProfile, error: errorProfile, isSuccess} = useGetProfile({ access, profileName: user?.groups[0] || '' });
  
  useEffect(() => {
    user && setUser(user)
    profile && setProfile(profile)
  }, [profile, user])

  useEffect(() => {
    if (access && !tokenExpired && deviceToken) {
      console.log('deviceToken', deviceToken);
      const deviceType = getDeviceType()
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
  }, [access, tokenExpired, deviceToken])

  useEffect(() => {
    if ("Notification" in window) {
      Notification && Notification.requestPermission()
        .then((permission) => {
          console.log("Notification permission:", permission);
          if (permission === "granted") {
            console.log("Notifications enabled.");
          } else if (permission === "denied") {
            console.warn("User denied notifications.");
          }
        })
        .catch((error) => {
          console.error("Error requesting notification permission:", error);
        });
    } else {
      console.warn("Notifications are not supported in this browser.");
    }
  
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      console.warn("Safari detected: Notifications might require the site to be added as a PWA.");
    }
  }, [])
  

  useLoader(isLoadingUser || isLoadingProfile)
  
  if (tokenExpired) {
    return <Navigate to="/" replace />
  }

  if (isErrorUser || isErrorProfile) {
    console.log('error', errorUser || errorProfile);
    return <Navigate to="/" replace />
  }

  if (isSuccess) {
    return children;
  }

};

export default PrivateRoutes;
