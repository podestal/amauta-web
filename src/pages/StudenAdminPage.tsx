// import ClassroomSummary from "../components/api/ClassRooms/ClassroomSummary"
// import StudentsAdmin from "../components/api/Students/StudentsAdmin"
// import Tabs from "../components/ui/Tabs"
// import useGetClassroom from "../hooks/api/classroom/useGetClassroom"
// import useSchoolStore from "../hooks/store/useSchoolStore"
// import useAuthStore from "../hooks/store/useAuthStore"
// import useLoader from "../hooks/ui/useLoader"

// const StudenAdminPage = () => {

      // const access =useAuthStore(s => s.access) || ''
      // const school = useSchoolStore(s => s.school)
      // const { data: classrooms, isLoading, isError, error, isSuccess } = useGetClassroom({ access, school: school.id.toString() })
      
      // useLoader(isLoading)

      // if (isError) return <p>Error {error.message}</p>
    
      // if (isSuccess)

//   return (
//     <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto pt-10">
//         <Tabs 
//           tabs={[
//             {label: 'Matrículas', content: <StudentsAdmin classrooms={classrooms} />},
//             {label: 'Alumnos', content: <ClassroomSummary classrooms={classrooms} />}
//           ]}
//         />
//     </div>
//   )
// }

// export default StudenAdminPage

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ClassroomSummary from "../components/api/ClassRooms/ClassroomSummary"
import StudentsAdmin from "../components/api/Students/StudentsAdmin"
import Tabs from "../components/ui/Tabs"
import useLoader from "../hooks/ui/useLoader";
import useGetClassroom from "../hooks/api/classroom/useGetClassroom";
import useAuthStore from "../hooks/store/useAuthStore";
import useSchoolStore from "../hooks/store/useSchoolStore";

const ResponsiveComponent = () => {
  const access =useAuthStore(s => s.access) || ''
  const school = useSchoolStore(s => s.school)
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Desktop is considered 1024px and above
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: classrooms, isLoading, isError, error, isSuccess } = useGetClassroom({ access, school: school.id.toString() })
      
  useLoader(isLoading)

  if (isError) return <p>Error {error.message}</p>

  if (isSuccess)

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto pt-10">
      {isDesktop ? (
        <Tabs
          tabs={[
            { label: "Matrículas", content: <StudentsAdmin classrooms={classrooms} /> },
            { label: "Alumnos", content: <ClassroomSummary classrooms={classrooms} /> },
          ]}
        />
      ) : (
        <motion.div
          className="w-full h-full flex flex-col items-center justify-center min-h-[50vh] mt-20 text-center px-6 bg-blue-800 text-white rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">⚠️ Atención</h2>
          <p className="text-lg sm:text-xl font-medium">
            Esta funcionalidad solo está disponible en **computadoras de escritorio o laptops**.  
            Por favor, accede desde un dispositivo con mayor tamaño de pantalla.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ResponsiveComponent;
