import APIClient from "./apiClient"

// weight = models.FloatField(null=True, blank=True)
// height = models.FloatField(null=True, blank=True)
// illness = models.TextField(null=True, blank=True)

export interface HealthInfo {
    id: string
    weight: number
    height: number
    illness: string
}

export type HealthInfoCreateUpdate = Omit<HealthInfo, 'id'>

export default new APIClient<HealthInfo, HealthInfoCreateUpdate>('health-info/')

