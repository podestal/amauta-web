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
      className="w-full flex flex-col mx-auto gap-4 mt-4 border-b border-gray-300 dark:border-gray-700 pb-4  shadow-md rounded-lg p-4"
    >
      {/* Top Section: Avatar and Student Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300 font-bold text-lg overflow-hidden">
          {student.picture ? (
            <img 
              src={student.picture || `https://ui-avatars.com/api/?name=${student.first_name}+${student.last_name}&background=random`} 
              alt={`${student.first_name} ${student.last_name}`} 
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span>
              {student.first_name[0]}{student.last_name[0]}
            </span>
          )}
        </div>

        {/* Student Name */}
        <div className="w-full flex justify-between">
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {student.first_name} {student.last_name}
          </p>
          <Announcements student={student} />
        </div>
      </div>

      {/* Student Attendance Section */}
      <div className="mt-4">
        <StudentAttendance 
          student={student}
          classroomId={classroomId}
          canModifyAttendance={canModifyAttendance}
        />
      </div>
    </motion.div>

  )
}

export default StudentCard