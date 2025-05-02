import APIClient from "./apiClient"

export interface Activity {
    id: number
    title: string
    description: string
    created_at: Date
    due_date: string
    quarter: string
    assignature: number
    category: number
    category_name: string
    competences: number[]
    capacities: number[]
    lessons: number[]
}

export interface ActivityByTutor {
    id: number
    title: string
    description: string
    due_date: string
    grade: string
    observations: string
}

export type UpdateCreateActivity = Omit<Activity, 'id' | 'created_at' | 'category_name' | 'lessons'> & {
    lessons?: number[] 
}

interface Props {
    activityId?: string
    byAssignature?: boolean
    byTutor?: boolean
    byLesson?: boolean
}

const getActivityService = ({ activityId, byAssignature=false, byTutor=false, byLesson=false }: Props) => {
    let url = 'activity/'
    if (activityId) url = `activity/${activityId}/`
    if (byAssignature) url = 'activity/byAssignature/'
    if (byTutor) url = 'activity/byTutor/'
    if (byLesson) url = 'activity/byLesson/'
    return new APIClient<Activity, UpdateCreateActivity>(url)
}

export default getActivityService