interface Props {
    lan: string
    grade: string
    section: string
    level: string
}

const getClassroomDescription = ({lan, grade, section, level }: Props)  => {
    const gradeConverter: Record<string, string> = {
        '1': lan === 'EN' ? 'First' : 'Primero',
        '2': lan === 'EN' ? 'Second' : 'Segundo',
        '3': lan === 'EN' ? 'Third' : 'Tercero',
        '4': lan === 'EN' ? 'Fourth' : 'Cuarto',
        '5': lan === 'EN' ? 'Fifth' : 'Quinto',
        '6': lan === 'EN' ? 'Sixth' : 'Sexto',
    }

    const levelConverter: Record<string, string> = {
        'P': lan === 'EN' ? 'Elementary' : 'Primaria',
        'S': lan === 'EN' ? 'Middle' : 'Secundaria',
    }
    

    return `${gradeConverter[grade]}-${section}-${levelConverter[level]}`
}

export default getClassroomDescription