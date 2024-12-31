interface Props {
    lan: string
    attendance: string 
}

const getAttendanceLabel = ({ lan, attendance }: Props) => {

    const attendanceLabels: Record<string, string> = {
        'O': lan === 'EN' ? 'On Time' : 'Temprano',
        'L': lan === 'EN' ? 'Late' : 'Tardanza',
        'N': lan === 'EN' ? 'Not Attended' : 'Falta',
        'E': lan === 'EN' ? 'Excused' : 'Excusado',
        'T': lan === 'EN' ? 'Left Early' : 'Salida Temprano',
    }

    return attendanceLabels[attendance]
}

export default getAttendanceLabel