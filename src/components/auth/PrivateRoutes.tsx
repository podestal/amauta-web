import useAuthStore from "../../hooks/store/useAuthStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useLoader from "../../hooks/ui/useLoader";
import useGetProfileStore from "../../hooks/store/useGetProfileStore";

interface Props {
  children: React.ReactElement;
}

const PrivateRoutes = ({ children }: Props) => {
  
  const access = useAuthStore((s) => s.access);
  const { profile, getProfile, isLoading, error } = useGetProfileStore()


  // fix bug

  useEffect(() => {
    if (access) {
      getProfile(access)
    }
  }, [access])

  useLoader(isLoading);

  if (!access) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching instructor:", error);
    return <Navigate to="/login" replace />;
  }

  if (profile) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoutes;
