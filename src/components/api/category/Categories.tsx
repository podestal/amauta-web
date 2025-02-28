import useGetCategories from "../../../hooks/api/category/useGetCategories"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLoader from "../../../hooks/ui/useLoader"

const Categories = () => {

    const access = useAuthStore(s => s.access) || ''
    const { data: categories, isLoading, isError, error, isSuccess } = useGetCategories({ access })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) 

  return (
    <div>
        <>{console.log('categories', categories)}</>
    </div>
  )
}

export default Categories