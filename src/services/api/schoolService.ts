import APIClient from "./apiClient"

export interface School {
    id: number,
    name: string,
    type_of_institution: string,
    picture_name: string,
    payment_status: string,
    automatic_late: string,
    automatic_late_initial: string,
}

export type CreateUpdateSchool = Omit<School, 'id' | 'picture_name'> & {

}

interface Props {
    schoolId?: number
}

const getSchoolService = ({schoolId}: Props) => {
    const url = schoolId ? `school/${schoolId}/` : 'school/'
    return new APIClient<School, CreateUpdateSchool>(url)
}
export default getSchoolService
