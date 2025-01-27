export const getStudentsCacheKey = ( classroom: string ) => {
    return [`students ${classroom}`]
}

export const getAnnouncementsCacheKey = ( student: string ) => {
    return [`announcements ${student}`]
}

interface AttendanceCacheProps {
    classroomId?: string
    studentId?: string
    time?: string
    month?: string
}

export const getAttendanceCacheKey = ( {classroomId, studentId, time, month }: AttendanceCacheProps ) => {

    if (classroomId) {
        return [`attendance ${classroomId} ${time}`]
    } 
    else if (studentId) {
        return [`attendance ${studentId} ${month}`]
    }
    return [`attendance`]

}
