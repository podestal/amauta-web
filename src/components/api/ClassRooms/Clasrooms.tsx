import Students from "../Students/Students"
import ClassroomCard from "./ClassroomCard"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"
import { Instructor } from "../../../services/api/instructorService"
import { Assistant } from "../../../services/api/assistantService"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { motion } from "framer-motion"

const Clasrooms = () => {

    const user = useGetProfileStore(s => s.user)
    const profile = useGetProfileStore(s => s.profile)
    const lan = useLanguageStore(s => s.lan)
    

    const role = user?.groups[0] || user?.profile
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
        <>
        <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-10">
            Clases
        </motion.h2>
        <motion.div 
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-col lg:grid md:grid-cols-2 lg:grid-cols-3 justify-start items-center gap-6 w-[90%] mx-auto">
            
            {classrooms.map( clasroom => (
                <ClassroomCard 
                    key={clasroom}
                    classroom={clasroom}
                />
            ))}
        </motion.div>
        </> 
    : 
        <Students 
            classroom={classrooms[0].split('-').pop()}
            level={classrooms[0].split('-')[2]}
        />}
    </div>
  )
}

export default Clasrooms