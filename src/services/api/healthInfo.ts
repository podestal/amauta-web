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

const healthInfoService = new APIClient<HealthInfo, HealthInfoCreateUpdate>('health-info/')

export default healthInfoService

