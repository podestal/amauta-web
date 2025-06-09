import APIClient from "./apiClient"

export interface Lesson {
    id: number
    instructor: number
    assignature: number
    classroom: number
    subject: string
    created_at: Date
    updated_at: Date
    content: string
    quarter: string
}

export type CreateUpdateLesson = Omit<Lesson, 'id' | 'created_at' | 'updated_at'>

interface Props {
    id?: string
    byAssignature?: boolean
}

const getLessonService = ({ id, byAssignature }: Props) => {
    // const url = id ? `lessons/${id}/` : 'lessons/'
    let url = 'lessons/'

    if (id) url = `lessons/${id}/`
    if (byAssignature) url = 'lessons/byAssignature/'
    return new APIClient<Lesson, CreateUpdateLesson>(url)
}
export default getLessonService