import useGetGradesByStudent from "../../../../hooks/api/grade/useGetGradesByStudent"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import { StudentByTotalScore } from "../../../../services/api/studentsService"
import RankingActivitiesChart from "./RankingActivitiesChart"
import RankingStudentActivities from "./RankingStudentActivities"

interface Props {
    student: StudentByTotalScore
    quarter: string
}

const SingleStudentBody = ({ student, quarter }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { data: grades, isLoading, isError, error, isSuccess } = useGetGradesByStudent({ access, student: (student.uid).toString(), quarter })

    if (isLoading) return <p className="text-center animate-pulse">Un Momento...</p>

    if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>

    if (isSuccess) 

  return (
    <div className="flex flex-col gap-8">
        <RankingActivitiesChart 
            grades={grades}
        />
        <RankingStudentActivities 
            studentUid={student.uid.toString()}
            quarter={quarter}
            grades={grades}
        />
    </div>
  )
}

export default SingleStudentBody