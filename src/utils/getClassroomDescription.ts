interface Props {
    lan: string
    grade: string
    section: string
    level: string
    short?: boolean
}

export const getClassroomGrade = (lan: string, grade: string) => {
    const gradeConverter: Record<string, string> = {
        '1': lan === 'EN' ? 'First' : 'Primero',
        '2': lan === 'EN' ? 'Second' : 'Segundo',
        '3': lan === 'EN' ? 'Third' : 'Tercero',
        '4': lan === 'EN' ? 'Fourth' : 'Cuarto',
        '5': lan === 'EN' ? 'Fifth' : 'Quinto',
        '6': lan === 'EN' ? 'Sixth' : 'Sexto',
    }

    return gradeConverter[grade]
}

const getClassroomDescription = ({lan, grade, section, level, short }: Props)  => {
    const gradeConverter: Record<string, string> = {
        '1': lan === 'EN' ? 'First' : 'Primero',
        '2': lan === 'EN' ? 'Second' : 'Segundo',
        '3': lan === 'EN' ? 'Third' : 'Tercero',
        '4': lan === 'EN' ? 'Fourth' : 'Cuarto',
        '5': lan === 'EN' ? 'Fifth' : 'Quinto',
        '6': lan === 'EN' ? 'Sixth' : 'Sexto',
    }

    const gradeConverterShort: Record<string, string> = {
        '1': lan === 'EN' ? '1st' : '1ro',
        '2': lan === 'EN' ? '2nd' : '2do',
        '3': lan === 'EN' ? '3rd' : '3ro',
        '4': lan === 'EN' ? '4th' : '4to',
        '5': lan === 'EN' ? '5th' : '5to',
        '6': lan === 'EN' ? '6th' : '6to',
    }

    const levelConverter: Record<string, string> = {
        'P': lan === 'EN' ? 'Elementary' : 'Primaria',
        'S': lan === 'EN' ? 'Middle' : 'Secundaria',
    }
    

    return short ? `${gradeConverterShort[grade]}-${section} ${levelConverter[level]}` : `${gradeConverter[grade]} ${section} ${levelConverter[level]}`
}

export default getClassroomDescription