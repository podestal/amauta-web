import APIClient from "./apiClient"

// dni = models.CharField(max_length=255, null=True, blank=True)
// date_of_birth = models.DateField(null=True, blank=True)
// state = models.CharField(max_length=255, null=True, blank=True)
// county = models.CharField(max_length=255, null=True, blank=True)
// city = models.CharField(max_length=255, null=True, blank=True)
// instruction_grade = models.CharField(max_length=255, null=True, blank=True)
// ocupation = models.CharField(max_length=255, null=True, blank=True)
// employer = models.CharField(max_length=255, null=True, blank=True)
// civil_status = models.CharField(max_length=1, choices=CIVIL_STATUS_CHOICES, null=True, blank=True)
// lives_with_student = models.BooleanField(blank=True, null=True)
// tutor_type = models.CharField(max_length=1, choices=TUTOR_TYPE_CHOICES, default=TUTOR_MOTHER)
// tutor_relationship = models.CharField(max_length=255, null=True, blank=True)

export interface Tutor {
    id: number
    students: number[]
    first_name: string
    last_name: string
    phone_number: string
    address: string
    email: string
    can_access: boolean
    dni: string
    date_of_birth: string
    state: string
    county: string
    city: string
    instruction_grade: string
    ocupation: string
    employer: string
    civil_status: string
    lives_with_student: boolean
    tutor_type: string
    tutor_relationship: string
    school: number
    clases_details: string[]
    user?: number
}

export type TutorCreateUpdate = Omit<Tutor, 'id' | 'students'> & {
    students: string[]
}

interface Props {
    tutorId?: string
    me?: boolean
}

const getTutorService = ({ tutorId, me }: Props) => {
    let url = 'tutor/'
    if (tutorId) {
        url += `${tutorId}/`
    } else if (me) {
        url += 'me/'
    }

    return new APIClient<Tutor, TutorCreateUpdate>(url)
}

export default getTutorService