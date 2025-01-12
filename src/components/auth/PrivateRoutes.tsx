import useAuthStore from "../../hooks/store/useAuthStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useGetProfileStore from "../../hooks/store/useGetProfileStore";
import useLoader from "../../hooks/ui/useLoader";
import useGetUser from "../../hooks/auth/useGetUser";
import useGetProfile from "../../hooks/api/profile/useGetProfile";
import usePushNotifications from "../../hooks/notifications/usePushNotifications";
import isTokenExpired from "../../utils/isTokenExpired";

interface Props {
  children: React.ReactElement;
}

const PrivateRoutes = ({ children }: Props) => {
  
  const access = useAuthStore((s) => s.access) || ''
  const tokenExpired = isTokenExpired(access)
  const {setUser, setProfile} = useGetProfileStore()
  const {data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser} = useGetUser({ access });
  const {data: profile, isLoading: isLoadingProfile, isError: isErrorProfile, error: errorProfile, isSuccess} = useGetProfile({ access, profileName: user?.groups[0] || '' });
  
  useEffect(() => {
    user && setUser(user)
    profile && setProfile(profile)
  }, [profile, user])

  useEffect(() => {
    if (access && !tokenExpired) {
      usePushNotifications(access)
    }
  }, [access, tokenExpired])

    useEffect(() => {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
        if (permission === "granted") {
          console.log("Notifications enabled.");
        } else {
          console.log("Notifications disabled.");
        }
      });
    }, []);

  useLoader(isLoadingUser || isLoadingProfile)
  
  if (tokenExpired) {
    return <Navigate to="/login" replace />
  }

  if (isErrorUser || isErrorProfile) {
    console.log('error', errorUser || errorProfile);
    return <Navigate to="/login" replace />
  }

  if (isSuccess) {
    return children;
  }

};

export default PrivateRoutes;
