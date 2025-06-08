import APIClient from "./apiClient"
import { BirthInfo } from "./birthInfo"
import { Classroom } from "./classroomService"
import { EmergencyContact } from "./emergencyContact"
import { HealthInfo } from "./healthInfo"
import { Tutor } from "./tutorService"

export interface Average {
    id: number
    calification: string
    competence: number
    conclusion: string
}

export interface AreaGrade {
    id: number
    calification: string
    area: number
}

export interface AssignatureGrade {
    id: number
    calification: string
    assignature: number
}

export interface StudentByAreaGrade {
    uid: number
    first_name: string
    last_name: string
    area_grades: AreaGrade[]
}

export interface StudentByAssignatureGrade {
    uid: number
    first_name: string
    last_name: string
    area_grade: AreaGrade
    assignature_grades: AssignatureGrade[]
}

export interface StudentByAgendas {
    uid: number
    first_name: string
    last_name: string
    tutor_phone: string
    filtered_read_agendas: boolean
    filtered_tutor_contact: boolean
}

export interface StudentByQuarterGrade {
    uid: number
    first_name: string
    last_name: string
    averages: Average[]
}

export interface StudentByTotalScore {
    uid: number
    first_name: string
    last_name: string
    total_score: number
    average_numeric: number
    average_alphabetical: string
}

export interface StudentGrade{
    id: number
    calification: string
    observations: string
    activity: number
    category: number
    weight: number
}

export interface StudentByGrade {
    uid: number
    first_name: string
    last_name: string
    filtered_grades: StudentGrade[]
    averages: Average[]
}

export interface SimpleAttendance {
    id: number
    status: 'N' | 'E' | 'L' | 'T' | 'O'
    kind: 'I' | 'O'
    observations: string
    created_at: Date
}

export interface Student {
    uid: string
    first_name: string
    last_name: string
    dni: string
    attendance: SimpleAttendance[] | null
    attendances: SimpleAttendance[]
    attendances_in: SimpleAttendance[]
    attendances_out: SimpleAttendance[]
    clase: Classroom
    picture: string
    prev_school: string
    tutor_phone: string
    main_language: string
    second_language: string
    number_of_siblings: number
    place_in_family: number
    religion: string
    address: string
    phone_number: string
    celphone_number: string
    map_location: string
    insurance: string
    other_insurance: string
    lives_with: string
    health_info:HealthInfo | null
    birth_info: BirthInfo | null
    emergency_contact: EmergencyContact | null
    tutors: Tutor[]
    tutor_name: string
    school: number
    is_active: boolean
}

export type StudentCreateUpdate = Omit<
    Student, 
        'uid' | 
        'attendance' | 
        'attendances_in' | 
        'attendances_out' | 
        'dni' |
        'attendances' |
        'picture' | 
        'prev_school' |
        'main_language' |
        'second_language' |
        'number_of_siblings' |
        'place_in_family' |
        'religion' |
        'address' |
        'phone_number' |
        'celphone_number' |
        'lives_with' |
        'insurance' |
        'map_location' | 
        'clase' |
        'health_info' |
        'birth_info' |
        'emergency_contact' |
        'other_insurance'|
        'tutor_name' | 
        'tutors'
    > & {
    uid?: string
    clase?: number
    tutor_name?: string
    dni?: string | null
    other_insurance?: string
    is_active?: boolean
    prev_school?: string
    main_language?: string
    second_language?: string
    number_of_siblings?: number
    place_in_family?: number
    religion?: string
    address?: string
    phone_number?: string
    celphone_number?: string
    lives_with?: string
    insurance?: string
}

interface Props {
    tutor?: boolean
    all?: boolean
    studentId?: string
    byName?: Boolean
    byDni?: Boolean
    byLastTen?: Boolean
    byQuarterGrade?: Boolean
    byGrade?: Boolean
    byAgendas?: Boolean
    byTotalScore?: Boolean
    byAreaGrade?: Boolean
    byAssignatureGrade?: Boolean
}

const getStudentService = ({ 
    tutor, 
    all, 
    studentId, 
    byName, 
    byDni, 
    byLastTen, 
    byQuarterGrade, 
    byGrade, 
    byAgendas, 
    byTotalScore, 
    byAreaGrade,
    byAssignatureGrade }: Props) => {

    let url = `student/byClassroom/`
    if (tutor) {
        url = `student/byTutor/`
    } if (all) {
        url = `student/`
    } else if (byName) {
        url = `student/byName/`
    } else if (byDni) {
        url = `student/byDni/`
    } else if (byLastTen) {
        url = `student/byLastTen/`
    } else if (studentId) {
        url = `student/${studentId}/`
    } else if (byQuarterGrade) {
        url = `student/byQuarterGrade/`
    } else if (byTotalScore) {
        url = `student/byTotalScore/`
    } else if (byAgendas) {
        url = `student/byAgendas/`
    } else if (byGrade) {
        url = `student/byGrade/`
    } else if (byAreaGrade) {
        url = `student/byAreaGrade/`
    } else if (byAssignatureGrade) {
        url = `student/byAssignatureGrade/`
    }

    return new APIClient<Student, StudentCreateUpdate>(url)

}
export default getStudentService