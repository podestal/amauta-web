import Students from "../Students/Students"
import ClassroomCard from "./ClassroomCard"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"
import { Instructor } from "../../../services/api/instructorService"

const Clasrooms = () => {

    const profile = useGetProfileStore(s => s.profile)

    const instructor = profile as Instructor

    if (!instructor?.clases_details?.length) return <p>No classes available</p>;
    
  return (
    <>
        {instructor.clases_details.length > 1 ? 
        <div className="flex flex-col justify-start items-center gap-12 w-full">
        {instructor.clases_details.map( clasroom => (
            <ClassroomCard 
                key={clasroom}
                classroom={clasroom}
            />
        ))}
        </div> 
        : 
        <Students 
            classroom={instructor.clases_details[0].split('-').pop()}
        />
        }
    </>
  )
}

export default Clasrooms