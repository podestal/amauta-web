import { useNavigate } from "react-router-dom"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import getClassroomDescription from "../../../utils/getClassroomDescription"

interface Props {
    classroom: string
}

const ClassroomCard = ({classroom}: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const [grade, section, level, id] = classroom.split("-");
    const classRoomDescription = getClassroomDescription({ lan, grade, section, level })
    const navigate = useNavigate()

    const handleNavigate = () => {
      navigate(`/students?classroom=${id}`)
    }
    
    

  return (
    <div 
      onClick={handleNavigate}
      className="w-full shadow-2xl shadow-blue-300 hover:bg-slate-900 cursor-pointer rounded-3xl py-12 flex justify-center items-center mt-10">
      <p className="text-xl font-bold">{classRoomDescription}</p>
    </div>
  )
}

export default ClassroomCard