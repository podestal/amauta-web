import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getCategoryService, { Category, UpdateCreateCategory } from "../../../services/api/categoryService"

export interface UpdateCategoryData {
    access: string
    category: UpdateCreateCategory
}

interface Props {
    categoryId: number
}

const useUpdateCategory = ({ categoryId }: Props): UseMutationResult<Category, Error, UpdateCategoryData> => {
    const categoryService = getCategoryService({ categoryId: categoryId.toString() })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: UpdateCategoryData) => categoryService.update(data.category, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Category[]>(['categories'], (oldData) => {
                if (!oldData) return []
                return oldData.map(category => category.id === categoryId ? res : category)
            })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateCategory