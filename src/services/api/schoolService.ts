import APIClient from "./apiClient"

export interface School {
    id: number,
    name: string,
    type: string,
    pictureName: string,
}

interface Props {
    schoolId?: number
}

const getSchoolService = ({schoolId}: Props) => {
    const url = schoolId ? `school/${schoolId}/` : 'school/'
    return new APIClient<School>(url)
}
export default getSchoolService
