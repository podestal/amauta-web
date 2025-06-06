import SchoolAdmin from "../components/api/school/SchoolAdmin"
import useGetSchool from "../hooks/api/school/useGetSchool"
import useAuthStore from "../hooks/store/useAuthStore"
import useGetProfileStore from "../hooks/store/useGetProfileStore"


const SchoolPage = () => {
    const access = useAuthStore(s => s.access) || ''
    const profile = useGetProfileStore(s => s.profile)
    const { data: school, isLoading, isError, error, isSuccess } = useGetSchool({ access, profile })

    if (isLoading) return <p className='text-center animate-pulse text-xs my-4'>Cargando...</p>
    if (isError) return <p className='text-center text-red-500 text-xs my-4'>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden pt-10">
      <SchoolAdmin 
        school={school}
      />
    </div>

  )
}

export default SchoolPage