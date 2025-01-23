export const canCreateUpdateAttendance = (classrooms: string[]) => {
    return classrooms.some(classroom => classroom.split('-')[2] === 'P')
  }
  