export const getStudentsCacheKey = ( classroom: string ) => {
    return [`students ${classroom}`]
}

export const getAnnouncementsCacheKey = ( student: string ) => {
    return [`announcements ${student}`]
}

interface AttendanceCacheProps {
    classroomId?: string
    studentId?: string
    month?: string
}

export const getAttendanceCacheKey = ( {classroomId, studentId, month }: AttendanceCacheProps ) => {

    if (classroomId) {
        return [`attendance ${classroomId}`]
    } else if (studentId) {
        console.log('attendance cache', [`attendance ${studentId} ${month}`]);
        
        return [`attendance ${studentId} ${month}`]
    }
    return [`attendance`]

}
