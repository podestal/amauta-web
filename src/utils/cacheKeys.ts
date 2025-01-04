export const getStudentsCacheKey = ( classroom: string ) => {
    return [`students ${classroom}`]
}

export const getAnnouncementsCacheKey = ( student: string ) => {
    return [`announcements ${student}`]
}

export const getAttendanceCacheKey = ( classroom: string ) => {
    return [`attendance ${classroom}`]
}
