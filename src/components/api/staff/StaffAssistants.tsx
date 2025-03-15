import useGetAssistants from "../../../hooks/api/assistant/useGetAssistants"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import StaffCard from "./StaffCard"

const StaffAssistants = () => {

    const access = useAuthStore(s => s.access) || ''
    const school = useSchoolStore(s => s.school) || ''
    const { data: assistants, isLoading, isError, error, isSuccess } = useGetAssistants({ access, school: school.id.toString() })

    if (isLoading) return <p className="animate-pulse text-sm text-center py-5">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
        {assistants.map( assistant => (
            <StaffCard 
                profile={assistant}
                key={assistant.id}
                group="assistant"
            />
        ))}
    </div>
  )
}

export default StaffAssistants