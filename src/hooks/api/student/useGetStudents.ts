import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getStudentService, { Student } from "../../../services/api/studentsService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"

interface Props {
    access: string
    classroomId?: string
    tutor?: boolean
    month?: string
    week?: string
}

const useGetStudents = ({ access, classroomId, tutor, month, week }: Props): UseQueryResult<Student[], Error> => {

    const studentService = getStudentService({ tutor })
    const STUDENT_CACHE_KEY = getStudentsCacheKey(classroomId || 'tutor')
    let params: { classroom: string; month?: string; week?: string } = { classroom: classroomId || '' }

    if (month) params = {...params, month: month}
    if (week) params = {...params, week: week}

    return useQuery({
        queryKey: STUDENT_CACHE_KEY,
        queryFn: () => classroomId ? studentService.get(access, params) : studentService.get(access),
    })
}

export default useGetStudents