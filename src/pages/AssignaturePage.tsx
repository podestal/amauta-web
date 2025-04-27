// import Activities from '../components/api/activity/Activities'
import { useLocation } from 'react-router-dom'
import useGetProfileStore from '../hooks/store/useGetProfileStore'
import Lessons from '../components/api/lesson/Lessons'


const AssignaturePage = () => {

  const state = useLocation().state
  const profile = useGetProfileStore(s => s.profile)
  const assignature = state.assignatureId
  const classroom = profile?.clases_details?.find( classroom => classroom.split('-')[classroom.split('-').length - 1] === (state.classroom)?.toString()) || ''
   

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden">

      <div className='w-full h-screen flex justify-center items-center'>
      <Lessons 
        classroom={classroom}
        assignature={assignature}
        area={state.area}
      />
      </div>


      
        {/* <Activities /> */}
    </div>
  )
}

export default AssignaturePage