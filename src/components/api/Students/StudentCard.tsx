import { Student } from "../../../services/api/studentsService"
import StudentAttendance from "./StudentAttendance"
import Announcements from "../announcement/Announcements"
import { motion } from "framer-motion"

interface Props {
    student: Student
    classroomId: string
}

const StudentCard = ({ student, classroomId }: Props) => {

  const itemVariants = {
    hidden: { opacity: 0, x: 50 }, 
    visible: { opacity: 1, x: 0 }, 
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="w-full grid grid-cols-3 mx-auto gap-4 mt-4">
      <div className="flex items-center justify-start gap-4 col-span-2 ">
        <Announcements 
          student={student}
        />
        <p className="text-sm text-left my-auto">{student.first_name} {student.last_name}</p>
      </div>
      <StudentAttendance 
          student={student}
          classroomId={classroomId}
      />
    </motion.div>
  )
}

export default StudentCard