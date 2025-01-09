import useAuthStore from "../../hooks/store/useAuthStore";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetProfileStore from "../../hooks/store/useGetProfileStore";
import useLoader from "../../hooks/ui/useLoader";

interface Props {
  children: React.ReactElement;
}

const PrivateRoutes = ({ children }: Props) => {
  
  const access = useAuthStore((s) => s.access);
  const { profile, getProfile, isLoading, error } = useGetProfileStore()
  const [isChecking, setIsChecking] = useState(true)


  useEffect(() => {
    const fetchProfile = async () => {
      if (access && !profile) {
        await getProfile(access)
      }
      setIsChecking(false)
    }
    fetchProfile()
  }, [access])

  useLoader(isLoading || isChecking)

  if (!access || !profile) {
    console.log('error', error);
    return <Navigate to="/login" replace />
  }

  return children
};

export default PrivateRoutes;
