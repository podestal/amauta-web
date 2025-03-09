import useGetCategories from "../../../hooks/api/category/useGetCategories"
import useAuthStore from "../../../hooks/store/useAuthStore"
import Selector from "../../ui/Selector"

interface Props {
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
    categoryError?: string
    setCategoryError?: React.Dispatch<React.SetStateAction<string>>
    all?: boolean
    categoryRef?: React.RefObject<HTMLSelectElement>
}

const CategorySelector = ({ setCategoryError, setSelectedCategory, categoryError, all, categoryRef }: Props) => {

    const access = useAuthStore(state => state.access) || ''
    const { data: categories, isLoading, isError, error, isSuccess } = useGetCategories({ access })

    if (isLoading) return <p className="animate-pulse text-center">Cargando...</p>
    if (isError) return <p>Error: {error.message}</p>
    if (!isSuccess) return <p>No se pudieron cargar las categorías</p>

  return (
    <Selector
        values={all ? [ {id: '0', name: 'Todas'}, ...categories.map(category => ({ id: category.id.toString(), name: category.title }))] : categories.map(category => ({ id: category.id.toString(), name: category.title })) }
        label="Categoría"
        setter={setSelectedCategory}
        defaultValue={all ? '0' : undefined}
        error={categoryError}
        lan='ES'
        setError={setCategoryError}
        ref={categoryRef}
    />
  )
}

export default CategorySelector