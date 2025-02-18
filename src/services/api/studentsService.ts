import APIClient from "./apiClient"
import { BirthInfo } from "./birthInfo"
import { Classroom } from "./classroomService"
import { EmergencyContact } from "./emergencyContact"
import { HealthInfo } from "./healthInfo"
import { Tutor } from "./tutorService"

export interface SimpleAttendance {
    id: number
    status: 'N' | 'E' | 'L' | 'T' | 'O'
    observations: string
    created_at: Date
}

export interface Student {
    uid: string
    first_name: string
    last_name: string
    attendance: SimpleAttendance[] | null
    attendances: SimpleAttendance[]
    attendances_in: SimpleAttendance[]
    attendances_out: SimpleAttendance[]
    clase: Classroom
    picture: string
    prev_school: string
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
}

export type StudentCreateUpdate = Omit<
    Student, 
        'uid' | 
        'attendance' | 
        'attendances_in' | 
        'attendances_out' | 
        'attendances' |
        'picture' | 
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
    other_insurance?: string
}

interface Props {
    tutor?: boolean
    all?: boolean
    studentId?: string
}

const getStudentService = ({ tutor, all, studentId }: Props) => {

    let url = `student/byClassroom/`
    if (tutor) {
        url = `student/byTutor/`
    } if (all) {
        url = `student/`
    } else if (studentId) {
        url = `student/${studentId}/`
    }

    return new APIClient<Student, StudentCreateUpdate>(url)

}
export default getStudentService