import { useSearchParams } from "react-router-dom";
import Students from "../components/api/Students/Students"

const StudentsByClassroom = () => {

  const [searchParams] = useSearchParams();
  const classroom = searchParams.get('classroom') || '';

  return (
    <Students 
        classroom={classroom}
    />
  )
}

export default StudentsByClassroom