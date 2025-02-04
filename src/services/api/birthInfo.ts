import APIClient from "./apiClient"

export interface BirthInfo {
    id: string
    date_of_birth: string
    state: string
    county: string
    city: string
    natural_birth: boolean
}

export type BirthInfoCreateUpdate = Omit<BirthInfo, 'id'> & {
    student: string
}

interface Props {
    birthInfoId?: string
}

const getBirthInfoService = ({ birthInfoId }: Props) => {
    const url = birthInfoId ? `birth-info/${birthInfoId}/` : 'birth-info/'
    return new APIClient<BirthInfo, BirthInfoCreateUpdate>(url)
}

export default getBirthInfoService