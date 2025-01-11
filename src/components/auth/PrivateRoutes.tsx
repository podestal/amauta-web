import useAuthStore from "../../hooks/store/useAuthStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useGetProfileStore from "../../hooks/store/useGetProfileStore";
import useLoader from "../../hooks/ui/useLoader";
import useGetUser from "../../hooks/auth/useGetUser";
import useGetProfile from "../../hooks/api/profile/useGetProfile";
import usePushNotifications from "../../hooks/notifications/usePushNotifications";

interface Props {
  children: React.ReactElement;
}

const PrivateRoutes = ({ children }: Props) => {
  
  const access = useAuthStore((s) => s.access) || ''
  const {setUser, setProfile} = useGetProfileStore()
  access && usePushNotifications(access)
  const {data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser} = useGetUser({ access });
  const {data: profile, isLoading: isLoadingProfile, isError: isErrorProfile, error: errorProfile, isSuccess} = useGetProfile({ access, profileName: user?.groups[0] || '' });
  
  useEffect(() => {
    user && setUser(user)
    profile && setProfile(profile)
  }, [profile, user])

  useLoader(isLoadingUser || isLoadingProfile)

  if (isErrorUser || isErrorProfile) {
    console.log('error', errorUser || errorProfile);
    return <Navigate to="/login" replace />
  }

  if (isSuccess) {
    return children;
  }

};

export default PrivateRoutes;
