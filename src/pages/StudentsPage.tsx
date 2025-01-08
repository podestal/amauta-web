import Clasrooms from "../components/api/ClassRooms/Clasrooms"
import useGetProfileStore from "../hooks/store/useGetProfileStore"

const StudentsPage = () => {

  const { profile} = useGetProfileStore(s => s.profile)

  console.log('profile', profile);
  

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden">
      <Clasrooms />
    </div>
  )
}

export default StudentsPage