export const getStudentsCacheKey = ( classroom: string ) => {
    return [`students ${classroom}`]
}

export const getAnnouncementsCacheKey = ( student: string ) => {
    return [`announcements ${student}`]
}

interface AttendanceCacheProps {
    classroomId?: string
    studentId?: string
}

export const getAttendanceCacheKey = ( {classroomId, studentId}: AttendanceCacheProps ) => {

    if (classroomId) {
        return [`attendance ${classroomId}`]
    } else if (studentId) {
        return [`attendance ${studentId}`]
    }
    return [`attendance`]

}
