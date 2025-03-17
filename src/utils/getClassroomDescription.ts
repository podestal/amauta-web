interface Props {
    lan: string
    grade: string
    section: string
    level: string
    short?: boolean
    noLevel?: boolean
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

const getClassroomDescription = ({lan, grade, section, level, short, noLevel=false }: Props)  => {

    const gradeToYears: Record<string, string> = {
        '1': '1 Año',
        '2': '2 Años',
        '3': '3 Años',
        '4': '4 Años',
        '5': '5 Años',
    }
    
    const gradeConverter: Record<string, string> = {
        '1': lan === 'EN' ? `${short ? '1st' : 'First'}` : `${short ? '1ro' : 'Primero'}`,
        '2': lan === 'EN' ? `${short ? '2nd' : 'Second'}` : `${short ? '2do' : 'Segundo'}`,
        '3': lan === 'EN' ? `${short ? '3rd' : 'Third'}` : `${short ? '3ro' : 'Tercero'}`,
        '4': lan === 'EN' ? `${short ? '4th' : 'Fourth'}` : `${short ? '4to' : 'Cuarto'}`,
        '5': lan === 'EN' ? `${short ? '5th' : 'Fifth'}` : `${short ? '5to' : 'Quinto'}`,
        '6': lan === 'EN' ? `${short ? '6th' : 'Sixth'}` : `${short ? '6to' : 'Sexto'}`,
    }

    const levelConverter: Record<string, string> = {
        'P': lan === 'EN' ? 'Elementary' : 'Primaria',
        'S': lan === 'EN' ? 'Middle' : 'Secundaria',
        'I': lan === 'EN' ? 'Kinder' : 'Inicial',
    }
    

    return level === 'I' ? `${gradeToYears[grade]} ${section === 'U' ? 'Unica' : section}${!noLevel ? `${levelConverter[level]}` : ''}` : `${gradeConverter[grade]} ${section} ${!noLevel ? `${levelConverter[level]}`: ''}`
}

export default getClassroomDescription