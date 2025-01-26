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
}

const useGetStudents = ({ access, classroomId, tutor, month, week, day }: Props): UseQueryResult<Student[], Error> => {

    const studentService = getStudentService({ tutor })

    let studentCacheKeyTime = `${classroomId}`

    if (day) {
        studentCacheKeyTime = `${classroomId} ${day} ${month}`
    } else if (week) {
        studentCacheKeyTime = `${classroomId} ${week}`
    } else if (month) {
        studentCacheKeyTime = `${classroomId} ${month}`
    }


    console.log('studentCacheKeyTime', studentCacheKeyTime)
    
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