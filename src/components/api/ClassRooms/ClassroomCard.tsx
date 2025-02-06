import { useNavigate } from "react-router-dom"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import getClassroomDescription from "../../../utils/getClassroomDescription"
import { motion } from "framer-motion"

interface Props {
    classroom: string
}

const ClassroomCard = ({classroom}: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const [grade, section, level, id] = classroom.split("-");
    const classRoomDescription = getClassroomDescription({ lan, grade, section, level })
    const navigate = useNavigate()

    const handleNavigate = () => {
      navigate(`/app/students?classroom=${id}`, { state: { level, classroom: id } })
    }
    
    const itemVariants = {
      hidden: { opacity: 0, x: 50 }, 
      visible: { opacity: 1, x: 0 }, 
    };

  return (
    <motion.div 
      variants={itemVariants}
      onClick={handleNavigate}
      className="w-full shadow-2xl  cursor-pointer border-b-2 border-r-2 border-b-blue-500 border-r-blue-500 shadow-blue-600 rounded-3xl py-8 px-6 flex flex-col justify-center items-center mt-10 text-white "
    >
      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-white" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm13 11a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1h12zM5 5h10v2H5V5z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>

      <p className="text-xl font-bold tracking-wide">{classRoomDescription}</p>
    </motion.div>
  )
}

export default ClassroomCard