import { areas } from "../../../../data/mockdataForGrades"
import getClassroomDescription from "../../../../utils/getClassroomDescription"
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Printer } from "lucide-react";
import GradeReportCard from "./GradeReportCard";

const classrooms = [
    {
        id: 1,
        level: 'P',
        section: 'U',
        grade: '1',
        total_students: 30,
        missing_dni: 5
    },
    {
        id: 2,
        level: 'P',
        section: 'U',
        grade: '2',
        total_students: 25,
        missing_dni: 3
    },
    {
        id: 3,
        level: 'P',
        section: 'U',
        grade: '3',
        total_students: 28,
        missing_dni: 2
    },
    {
        id: 4,
        level: 'P',
        section: 'U',
        grade: '4',
        total_students: 27,
        missing_dni: 1
    },
    {
        id: 5,
        level: 'P',
        section: 'U',
        grade: '5',
        total_students: 29,
        missing_dni: 0
    },
    {
        id: 6,
        level: 'P',
        section: 'U',
        grade: '6',
        total_students: 26,
        missing_dni: 4
    },
    {
        id: 7,
        level: 'S',
        section: 'U',
        grade: '1',
        total_students: 32,
        missing_dni: 6
    },
    {
        id: 8,
        level: 'S',
        section: 'U',
        grade: '2',
        total_students: 30,
        missing_dni: 2
    },
    {
        id: 9,
        level: 'S',
        section: 'U',
        grade: '3',
        total_students: 31,
        missing_dni: 3
    },
    {
        id: 10,
        level: 'S',
        section: 'U',
        grade: '4',
        total_students: 29,
        missing_dni: 1
    },
    {
        id: 11,
        level: 'S',
        section: 'U',
        grade: '5',
        total_students: 28,
        missing_dni: 0
    },
]

const ClassroomsReportCard = () => {
  return (
    <div className="grid gap-6 pt-10">
        <h2 className="text-4xl font-bold text-center">Clases</h2>
    {classrooms.map((classroom) => {
      const allFinalized = areas.every((area) => area.title);

      return (
        <motion.div
          key={classroom.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800 rounded-2xl shadow-md p-6 "
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold ">
                {getClassroomDescription({
                  lan: "ES",
                  grade: classroom.grade,
                  section: classroom.section,
                  level: classroom.level,
                })}
              </h2>
              <p className="text-sm text-slate-200">Total Estudiantes: {classroom.total_students}</p>
            </div>

            <GradeReportCard allFinalized={true} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {areas.map((area) => (
              <div
                key={area.id}
                className="flex items-center justify-between p-3 rounded-lg shadow-sm bg-slate-900"
              >
                <span className="text-sm font-medium text-slate-100">{area.title}</span>
                {area.title ? (
                  <CheckCircle className="text-green-600 w-5 h-5" />
                ) : (
                  <XCircle className="text-red-500 w-5 h-5" />
                )}
              </div>
            ))}
          </div>

          {!allFinalized && (
            <p className="mt-4 text-sm text-red-500 font-medium">
              ⚠️ Debes completar todas las calificaciones antes de imprimir los reportes.
            </p>
          )}
        </motion.div>
      );
    })}
  </div>
  )
}

export default ClassroomsReportCard