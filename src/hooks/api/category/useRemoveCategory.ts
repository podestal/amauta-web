import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getCategoryService, { Category } from "../../../services/api/categoryService"
import { AxiosError } from "axios"

interface RemoveCategoryData {
    access: string
}

interface Props {
    categoryId: number
}

const useRemoveCategory = ({ categoryId }: Props): UseMutationResult<Category, AxiosError, RemoveCategoryData> => {
    const categoryService = getCategoryService({ categoryId: categoryId.toString() })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: RemoveCategoryData) => categoryService.delete(data.access),
        onSuccess: res => { 
            console.log(res)
            queryClient.setQueryData<Category[]>(['categories'], (oldData) => {
                if (!oldData) return []
                return oldData.filter(category => category.id !== categoryId)
            })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useRemoveCategory