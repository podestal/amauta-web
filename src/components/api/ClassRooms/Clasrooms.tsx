import Students from "../Students/Students"
import ClassroomCard from "./ClassroomCard"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"
import { Instructor } from "../../../services/api/instructorService"
import { Assistant } from "../../../services/api/assistantService"

const Clasrooms = () => {

    const user = useGetProfileStore(s => s.user)
    const profile = useGetProfileStore(s => s.profile)
    console.log('user', user);
    
    const instructor = user?.groups[0] === 'instructor' && profile as Instructor

    const assistant = user?.groups[0] === 'assistant' && profile as Assistant

    if (instructor && !instructor?.clases_details?.length) return <p>No classes available</p>;

    console.log('assistant',assistant);
    
    
  return (
    <>
    {assistant && 
    <div className="flex flex-col justify-start items-center gap-6 w-[90%] mx-auto mb-32">
        <h2 className="text-2xl font-bold text-center">Clases</h2>
        {assistant.clases_details.length > 0 && assistant.clases_details.map( clasroom => (
            <ClassroomCard 
                key={clasroom}
                classroom={clasroom}
            />
        ))}
    </div> 
    }
    {instructor && 
    <div>
        {instructor.clases_details.length > 1 ? 
        <div className="flex flex-col justify-start items-center gap-6 w-[90%] mx-auto">
            <h2 className="text-2xl font-bold text-center">Clases</h2>
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
    </div>}
    </>
  )
}

export default Clasrooms