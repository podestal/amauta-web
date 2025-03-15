import useGetAssistants from "../../../hooks/api/assistant/useGetAssistants"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../hooks/store/useSchoolStore"

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
            <div 
                className="bg-gray-800 px-4 py-2 rounded-lg text-white w-[70%]"
                key={assistant.id}
            >
                <p className="font-bold">{assistant.first_name} {assistant.last_name}</p>
            </div>
        ))}
    </div>
  )
}

export default StaffAssistants