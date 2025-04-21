const clssroomToAges: Record<string, number> = {
    '3-I': 3,
    '4-I': 4,
    '5-I': 5,
    '1-P': 6,
    '2-P': 7,
    '3-P': 8,
    '4-P': 9,
    '5-P': 10,
    '6-P': 11,
    '1-S': 12,
    '2-S': 13,
    '3-S': 14,
    '4-S': 15,
    '5-S': 16,
}

const getAgeFromClassroom = (classroom: string): number => {
    if (!classroom) return 0
    const [grade, section, level, id] = classroom.split('-')
    console.log(`${section}-${id}`)
    const age = clssroomToAges[`${grade}-${level}`]
    
    return age
}

export default getAgeFromClassroom