import { Student } from "../../../services/api/studentsService"
import StudentAttendance from "./StudentAttendance"
import Announcements from "../announcement/Announcements"
import { motion } from "framer-motion"


interface Props {
    student: Student
    classroomId: string
    canModifyAttendance: boolean
}

const StudentCard = ({ student, classroomId, canModifyAttendance=true }: Props) => {
  
  const itemVariants = {
    hidden: { opacity: 0, x: 50 }, 
    visible: { opacity: 1, x: 0 }, 
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="w-full flex flex-col mx-auto gap-4 mt-4 border-b border-gray-300 dark:border-gray-700 pb-4">
      <div className="flex items-center justify-start gap-4 col-span-2 ">
        <Announcements 
          student={student}
        />
        <p className="text-lg text-left my-auto font-bold">{student.first_name} {student.last_name}</p>
      </div>
      <StudentAttendance 
          student={student}
          classroomId={classroomId}
          canModifyAttendance={canModifyAttendance}
      />
    </motion.div>
  )
}

export default StudentCard