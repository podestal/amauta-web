import { useSearchParams } from "react-router-dom";
import Students from "../components/api/Students/Students"

const StudentsByClassroom = () => {

  const [searchParams] = useSearchParams();
  const classroom = searchParams.get('classroom') || '';
  

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden">
      <Students 
          classroom={classroom}
      />
    </div>
  )
}

export default StudentsByClassroom