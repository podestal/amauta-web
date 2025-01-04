export const getAttendanceStatus = (lan: string) => {

    return [
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