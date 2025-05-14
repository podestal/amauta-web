import { StudentByQuarterGrade } from "../services/api/studentsService"

interface Props {
    student: StudentByQuarterGrade
}

const gradesToNumbers: Record<string, number> = {
    'AD': 4,
    'A': 3,
    'B': 2,
    'C': 1,

}

const getFinalGrade = ({ student }: Props) => {
    if (student.averages.length === 0) {
        return 0
    }
    const numericGrades = student.averages.map(average => average.calification === 'NA' ? 0 : gradesToNumbers[average.calification])
    console.log('numericGrades', numericGrades);
    
    const finalGrade = numericGrades.reduce((acc, grade) => acc + grade, 0) / numericGrades.length
    console.log('finalGrade', finalGrade);
    
}

export default getFinalGrade