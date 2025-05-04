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
import useGetSchool from "../../hooks/api/school/useGetSchool";
import useSchoolStore from "../../hooks/store/useSchoolStore";
import useRefreshToken from "../../hooks/auth/useRefreshToken";

interface Props {
  children: React.ReactElement;
}

const PrivateRoutes = ({ children }: Props) => {
  
  const access = useAuthStore((s) => s.access) || ''
  const refresh = useAuthStore((s) => s.refresh) || ''
  const tokenExpired = isTokenExpired(access)
  const { mutate: refreshToken, isPending } = useRefreshToken()
  const {setUser, setProfile} = useGetProfileStore()
  const setSchool = useSchoolStore(s => s.setSchool)
  const deviceToken = useFirebaseMessaging()
  const {data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser} = useGetUser({ access });
  const {data: profile, isLoading: isLoadingProfile, isError: isErrorProfile, error: errorProfile, isSuccess} = useGetProfile({ access, profileName: user?.groups[0] || user?.profile || '' });
  const { data: school, isLoading: isLoadingSchool, isError: isErrorSchool, error: errorSchool } = useGetSchool({ access, profile })

  useLoader(isPending)
  
  useEffect(() => {
    if (!tokenExpired) return
    refreshToken({ token: { refresh } });
  }, [tokenExpired])

  useEffect(() => {
    console.log('profile', profile);
    console.log('user', user);
    user && setUser(user)
    profile && setProfile(profile)
    school && setSchool(school)
  }, [profile, user, school])

  useEffect(() => {
    if (access && !tokenExpired && deviceToken) {
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
  

  useLoader(isLoadingUser || isLoadingProfile || isLoadingSchool)
  
  // if (tokenExpired) {
  //   return <Navigate to="/" replace />
  // }

  if (isErrorUser || isErrorProfile || isErrorSchool) {
    console.log('error', errorUser || errorProfile || errorSchool);
    return <Navigate to="/" replace />
  }


  if (school?.payment_status === 'N') {
    return <p></p>
  }

  if (isSuccess) {
    return children;
  }

};

export default PrivateRoutes;
