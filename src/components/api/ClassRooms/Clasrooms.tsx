import Students from "../Students/Students"
import ClassroomCard from "./ClassroomCard"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"
import { Instructor } from "../../../services/api/instructorService"
import { Assistant } from "../../../services/api/assistantService"
import useLanguageStore from "../../../hooks/store/useLanguageStore"

const Clasrooms = () => {

    const user = useGetProfileStore(s => s.user)
    const profile = useGetProfileStore(s => s.profile)
    const lan = useLanguageStore(s => s.lan)
    

    const role = user?.groups[0]
    const isInstructor = role === 'instructor'
    const isAssistant = role === 'assistant'

    const classrooms = isInstructor
        ? (profile as Instructor)?.clases_details
        : isAssistant
        ? (profile as Assistant)?.clases_details
        : []

    if (!classrooms?.length) return <p>{lan === 'EN' ? 'No classes available' : 'No hay clases disponibles'}</p>;

  return (
    <div className="mb-32">
        {classrooms.length > 1 
        ?
        <div className="flex flex-col justify-start items-center gap-6 w-[90%] mx-auto">
            <h2 className="text-2xl font-bold text-center">Clases</h2>
            {classrooms.map( clasroom => (
                <ClassroomCard 
                    key={clasroom}
                    classroom={clasroom}
                />
            ))}
        </div> 
    : 
        <Students 
            classroom={classrooms[0].split('-').pop()}
            level={classrooms[0].split('-')[2]}
        />}
    </div>
  )
}

export default Clasrooms