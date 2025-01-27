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
    week?: string
}

export const getAttendanceCacheKey = ( {classroomId, studentId, month, week }: AttendanceCacheProps ) => {

    if (classroomId) {
        return [`attendance ${classroomId} ${week}`]
    } else if (studentId) {
        console.log('attendance cache', [`attendance ${studentId} ${month}`]);
        
        return [`attendance ${studentId} ${month}`]
    }
    return [`attendance`]

}
