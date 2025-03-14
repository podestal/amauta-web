import useGetInstructors from "../../../hooks/api/instructor/useGetInstructors"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../hooks/store/useSchoolStore";

const StaffInstructors = () => {
    
    const access = useAuthStore(s => s.access) || ''
    const school = useSchoolStore(s => s.school) || ''
    const { data: instructors, isLoading, isError, error, isSuccess } = useGetInstructors({ access, school: school.id.toString() })

    if (isLoading) return <p className="animate-pulse text-sm text-center py-5">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
        {instructors.map( instructor => (
            <p key={instructor.id}>{instructor.first_name}</p>
        ))}
    </div>
  )
}

export default StaffInstructors