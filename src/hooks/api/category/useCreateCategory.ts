import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getCategoryService, { Category, UpdateCreateCategory } from "../../../services/api/categoryService"

export interface CreateCategoryData {
    access: string
    category: UpdateCreateCategory
}

const useCreateCategory = (): UseMutationResult<Category, Error, CreateCategoryData> => {
    const categoryService = getCategoryService({})
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateCategoryData) => categoryService.post(data.category, data.access),
        onSuccess: res => {
    
            queryClient.setQueryData<Category[]>(['categories'], (oldData) => {
                if (!oldData) return [res]
                return [...oldData, res]
            })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateCategory