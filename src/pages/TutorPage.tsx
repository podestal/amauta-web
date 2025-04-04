import TutorStudents from "../components/api/tutor/TutorStudents";

const TutorPage = () => {

  return (
    <div className="w-full min-h-screen max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1280px] mx-auto h-screen pt-20 overflow-scroll">
        <TutorStudents />
    </div>
  )
}

export default TutorPage