import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getStudentService, { Student } from "../../../services/api/studentsService"
import { getStudentsCacheKey } from "../../../utils/cacheKeys"

interface Props {
    access: string
    classroomId?: string
    tutor?: boolean
    month?: string
    week?: string
    day?: string
    all?: boolean
}

const useGetStudents = ({ access, classroomId, tutor, month, week, day, all }: Props): UseQueryResult<Student[], Error> => {

    const studentService = getStudentService({ tutor, all })

    let studentCacheKeyTime = classroomId ? `${classroomId}` : 'all'
    

    if (day) {
        studentCacheKeyTime = `${classroomId} ${day} ${month}`
    } else if (week) {
        studentCacheKeyTime = `${classroomId} ${week}`
    } else if (month) {
        studentCacheKeyTime = `${classroomId} ${month}`
    }
    
    const STUDENT_CACHE_KEY = getStudentsCacheKey(studentCacheKeyTime || 'tutor')
    let params: { classroom: string; day?: string; month?: string; week?: string } = { classroom: classroomId || '' }

    if (day) params = {...params, day: day}
    if (month) params = {...params, month: month}
    if (week) params = {...params, week: week}

    return useQuery({
        queryKey: STUDENT_CACHE_KEY,
        queryFn: () => classroomId ? studentService.get(access, params) : studentService.get(access),
    })
}

export default useGetStudents