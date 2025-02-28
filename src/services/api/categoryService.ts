import APIClient from "./apiClient"

export interface Category {
    id: number
    title: string
    created_at: Date
    weight: number
    instructor: number
}

export type UpdateCreateCategory = Omit<Category, 'id' | 'created_at'>

interface Props {
    categoryId?: string
}

const getCategoryService = ({ categoryId }: Props) => {
    const url = categoryId ? `category/${categoryId}/` : 'category/'
    return new APIClient<Category, UpdateCreateCategory>(url)
}

export default getCategoryService
