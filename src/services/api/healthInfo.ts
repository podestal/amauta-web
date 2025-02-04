import APIClient from "./apiClient"

export interface HealthInfo {
    id: string
    weight: number
    height: number
    illness: string
}

export type HealthInfoCreateUpdate = Omit<HealthInfo, 'id'> & {
    student: string
}

interface Props {
    healthInfoId?: string
}

const getHealthInfoService = ({ healthInfoId }: Props) => {
    const url = healthInfoId ? `health-info/${healthInfoId}/` : 'health-info/'
    return new APIClient<HealthInfo, HealthInfoCreateUpdate>(url)
}

export default getHealthInfoService

