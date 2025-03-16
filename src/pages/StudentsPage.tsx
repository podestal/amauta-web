import Clasrooms from "../components/api/ClassRooms/Clasrooms"
import useGetProfileStore from "../hooks/store/useGetProfileStore"
import TutorPage from "./TutorPage"

const StudentsPage = () => {

  const group = useGetProfileStore(s=>s.user?.groups[0] || s.user?.profile)

  return (
    <>
      {group === 'assistant' &&
      <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden pt-20">
        <Clasrooms />
      </div>
      }
      {group === 'instructor' &&
      <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto overflow-hidden pt-20">
        <Clasrooms />
      </div>
      }
      {group === 'tutor' && 
      <div>
        <TutorPage />
      </div>}
    </>
  )
}

export default StudentsPage