import { useQuery, UseQueryResult } from "@tanstack/react-query"
import getCategoryService, {Category} from "../../../services/api/categoryService"

interface Props {
    access: string
}

const useGetCategories = ({ access }: Props): UseQueryResult<Category[]> => {
    const categoryService = getCategoryService({})
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryService.get(access),
    })
}

export default useGetCategories