import useGetInstructor from "../../hooks/api/instructor/useGetInstructor";
import useAuthStore from "../../hooks/store/useAuthStore";
import { Navigate } from "react-router-dom";
import useInstructorStore from "../../hooks/store/useInstructorStore";
import { useEffect } from "react";
import useLoader from "../../hooks/ui/useLoader";

interface Props {
  children: React.ReactElement;
}

const PrivateRoutes = ({ children }: Props) => {
  const access = useAuthStore((s) => s.access) || "";
  const {
    data: instructor,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetInstructor({ access });
  const setInstructor = useInstructorStore((s) => s.setInstructor);

  useEffect(() => {
    if (instructor) {
      setInstructor(instructor);
    }
  }, [instructor, setInstructor]);

  useLoader(isLoading);

  if (!access) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error("Error fetching instructor:", error?.message);
    return <Navigate to="/login" replace />;
  }

  if (isSuccess && instructor) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoutes;
