import useGetInstructor from "../../../hooks/api/instructor/useGetInstructor"
import useAuthStore from "../../../hooks/store/useAuthStore"
import Students from "../Students/Students"
import ClassroomCard from "./ClassroomCard"

const Clasrooms = () => {

    const access = useAuthStore(s => s.access) || ''
    const {data: instructor, isLoading, isError, error, isSuccess} = useGetInstructor({ access })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)
    
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
        ''
        }
        <Students 
            classroom={instructor.clases_details[0].split('-').pop()}
        />
    </>
  )
}

export default Clasrooms