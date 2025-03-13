import { Classroom } from "../../../services/api/classroomService"
import getClassroomDescription from "../../../utils/getClassroomDescription"

interface Props {
    classroom: Classroom
}

const ClassroomAdminCard = ({ classroom }: Props) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-4 rounded-2xl hover:bg-gray-700 cursor-pointer border-l-8 border-blue-600">
        <h3 className="font-bold">{getClassroomDescription({ lan:'ES', grade: classroom.grade, section:classroom.section, level: classroom.level, short: true, noLevel:true})}</h3>
        {/* <p>{classroom.students.length} Alumnos</p> */}
        <div className="flex flex-col gap-1">
            <p className="text-xs text-slate-300">Alumnos: 26</p>
            <p className="text-xs text-slate-300">Instructores: 26</p>
        </div>
    </div>
  )
}

export default ClassroomAdminCard