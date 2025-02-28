import APIClient from "./apiClient"

export interface Activity {
    id: number
    title: string
    description: string
    created_at: Date
    due_date: Date
    quarter: string
    assignature: number
    category: number
    competences: number[]
    capacities: number[]
}

export type UpdateCreateActivity = Omit<Activity, 'id' | 'created_at'>

interface Props {
    activityId?: string
    byAssignature?: boolean
}

const getActivityService = ({ activityId, byAssignature=false }: Props) => {
    let url = 'activity/'
    if (activityId) url = `activity/${activityId}/`
    if (byAssignature) url = 'activity/byAssignature/'
    return new APIClient<Activity, UpdateCreateActivity>(url)
}

export default getActivityService