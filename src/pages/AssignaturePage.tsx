import { useLocation } from 'react-router-dom'
import Assignments from '../components/api/assignments/Assignments'

const AssignaturePage = () => {

    const assignatureId = useLocation().pathname.split('/')[3]

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden">
        <Assignments 
            assignatureId={parseInt(assignatureId)}
        />
    </div>
  )
}

export default AssignaturePage