import getClassroomDescription from "./getClassroomDescription";

export const getAttendanceStatus = (lan: string) => {

    return [
        {
            id: '0',
            name: lan === 'EN' ? 'Select' : 'Selecionar',
        },
        {
            id: 'O',
            name: lan === 'EN' ? 'On Time' : 'Temprano',
        },
        {
            id: 'L',
            name: lan === 'EN' ? 'Late' : 'Tardanza',
        },
        {
            id: 'N',
            name: lan === 'EN' ? 'Not Attended' : 'Falta',
        },
        {
            id: 'E',
            name: lan === 'EN' ? 'Excused' : 'Excusado',
        },
        {
            id: 'T',
            name: lan === 'EN' ? 'Left Early' : 'Salida Temprano',
        },
    ]
}

export const getInstructorClassrooms = ((classrooms: string[], lan: string) => {
    if (!classrooms) return []
    return classrooms.map(classroom => {
        const [grade, section, level, id] = classroom.split("-");
        const classRoomDescription = getClassroomDescription({ lan, grade, section, level })
        return {
            id: id,
            name: classRoomDescription
        }
    })
})