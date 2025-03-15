import useGetAdmins from "../../../hooks/api/admin/useGetadmins"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../hooks/store/useSchoolStore"


const StaffAdmin = () => {

    const access = useAuthStore(s => s.access) || ''
    const school = useSchoolStore(s => s.school) || ''
    const { data: admins, isLoading, isError, error, isSuccess} = useGetAdmins({ access, school: school.id.toString() })

    if (isLoading) return <p className="animate-pulse text-sm text-center py-5">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
        {admins.map( admin => (
            <p key={admin.id}>{admin.first_name}</p>
        ))}
    </div>
  )
}

export default StaffAdmin