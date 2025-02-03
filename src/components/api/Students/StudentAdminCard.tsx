import { Student } from "../../../services/api/studentsService"

interface Props {
    student: Student
}

const StudentAdminCard = ({ student }: Props) => {
  return (
    <div className="w-full grid grid-cols-7 gap-6 hover:bg-slate-200 dark:hover:bg-slate-900 p-4 rounded-xl cursor-pointer">
        
        <div className="col-span-3">
          <p className="">{student.first_name} {student.last_name}</p>
        </div>
        <div></div>
        <div className={`w-[40%] h-4 ${student.birth_info ? 'bg-green-600' : 'bg-amber-600'}`}/>
        <div className={`w-[40%] h-4 ${student.health_info ? 'bg-green-600' : 'bg-amber-600'}`}/>
        <div className={`w-[40%] h-4 ${student.emergency_contact ? 'bg-green-600' : 'bg-amber-600'}`}/>
    </div>
  )
}

export default StudentAdminCard