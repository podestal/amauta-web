import { motion } from "framer-motion"
import useGetClassroom from "../../../hooks/api/classroom/useGetClassroom"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import useLoader from "../../../hooks/ui/useLoader"
import ClassroomAdminCard from "./ClassroomAdminCard"
import CreateClassroom from "./CreateClassroom"

const levels = [
    {id: 'I', name: 'Inicial'},
    {id: 'P', name: 'Primaria'},
    {id: 'S', name: 'Secundaria'},
]

const ClassroomsAdmin = () => {

    const school = useSchoolStore(s => s.school)
    const access = useAuthStore(s => s.access) || ''

    const { data: classrooms, isLoading, isError, error, isSuccess } = useGetClassroom({ access, school: school.id.toString() })

    useLoader(isLoading)

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div className="grid grid-cols-3 gap-4">
        {levels.map(level => (
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={level.id}>
                <h2 className="text-xl font-bold my-4 text-center">{level.name}</h2>
                <CreateClassroom 
                    level={level.id}
                />
                <div className="flex flex-col gap-4">
                    {classrooms.filter(classroom => classroom.level === level.id).map(classroom => (
                        <ClassroomAdminCard 
                            key={classroom.id}
                            classroom={classroom}
                        />
                    ))}
                </div>
            </motion.div>
        ))}
    </div>
  )
}

export default ClassroomsAdmin