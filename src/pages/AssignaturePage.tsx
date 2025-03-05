// import { useLocation } from 'react-router-dom'
import Activities from '../components/api/activity/Activities'

const AssignaturePage = () => {

    // const assignatureId = useLocation().pathname.split('/')[3]
    // const area = useLocation().state.area
    

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden">
        {/* <Assignments 
            assignatureId={parseInt(assignatureId)}
            area={area}
        /> */}
        <Activities />
    </div>
  )
}

export default AssignaturePage