import useAuthStore from "../../../hooks/store/useAuthStore"
import useGetStudentsByTotalScore from "../../../hooks/api/student/useGetStudentsByTotalScore"
import RankingStudentCard from "./RankingStudentCard"

interface Props {
    classroomId : string
    quarter: string
}

const RankingStudents = ({ classroomId, quarter }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: students, isLoading, isError, error, isSuccess} = useGetStudentsByTotalScore({ access, classroomId, quarter })

    if (isLoading) return <p className="text-center animate-pulse">Cargando...</p>
    if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>
    if (isSuccess) 

  return (
    <div className="space-y-6">
        {students && students
        .sort((a, b) => {
            if (a.average_numeric === b.average_numeric) {
                return a.first_name.localeCompare(b.first_name)
            }
            return b.average_numeric - a.average_numeric
        })
        .map((student, idx) => {
            return (
                <RankingStudentCard 
                    key={student.uid}
                    student={student}
                    idx={idx}
                    quarter={quarter}
                />
            )
        })}
    </div>
  )
}

export default RankingStudents
