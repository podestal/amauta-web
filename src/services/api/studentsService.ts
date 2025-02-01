import APIClient from "./apiClient"
import { Classroom } from "./classroomService"

export interface SimpleAttendance {
    id: number
    status: 'N' | 'E' | 'L' | 'T' | 'O'
    observations: string
    created_at: Date
}

// prev_school = models.CharField(max_length=255, null=True, blank=True)
// main_language = models.CharField(max_length=1, choices=LANGUAGE_CHOICES, default=SPANISH_LANGUAGE)
// second_language = models.CharField(max_length=1, choices=LANGUAGE_CHOICES, null=True, blank=True)
// number_of_siblings = models.IntegerField(default=0)
// place_in_family = models.IntegerField(default=0)
// religion = models.CharField(max_length=1, choices=RELIGION_CHOICES, default=CATHOLIC_RELIGION)
// address = models.TextField(blank=True, null=True)
// phone_number = models.CharField(max_length=255, blank=True, null=True)
// celphone_number = models.CharField(max_length=255, blank=True, null=True)
// map_location = models.CharField(max_length=255, blank=True, null=True)
// insurance = models.CharField(max_length=1, choices=RELIGION_CHOICES, blank=True, null=True)
// lives_with = models.CharField(max_length=255, blank=True, null=True)

export interface Student {
    uid: string
    first_name: string
    last_name: string
    attendance: SimpleAttendance[] | null
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
    lives_with: string
}

export type StudentCreateUpdate = Omit<Student, 'uid' | 'attendance' | 'attendances_in' | 'attendances_out' | 'picture' | 'map_location'>

interface Props {
    tutor?: boolean
}

const getStudentService = ({ tutor }: Props) => {

    const URL = tutor ? `student/byTutor/` : `student/byClassroom/`
    return new APIClient<Student, StudentCreateUpdate>(URL)

}
export default getStudentService