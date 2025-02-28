import React from "react"
import useGetCategories from "../../../hooks/api/category/useGetCategories"
import useAuthStore from "../../../hooks/store/useAuthStore"
import Selector from "../../ui/Selector"

interface Props {
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
    categoryError: string
    setCategoryError: React.Dispatch<React.SetStateAction<string>>
}

const CategorySelector = ({ setCategoryError, setSelectedCategory, categoryError }: Props) => {

    const access = useAuthStore(state => state.access) || ''
    const { data: categories, isLoading, isError, error, isSuccess } = useGetCategories({ access })

    if (isLoading) return <p className="animate-pulse text-center">Cargando...</p>
    if (isError) return <p>Error: {error.message}</p>
    if (!isSuccess) return <p>No se pudieron cargar las categorías</p>

  return (
    <Selector
        values={categories.map(category => ({ id: category.id.toString(), name: category.title }))}
        label="Categoría"
        setter={setSelectedCategory}
        lan="ES"
        error={categoryError}
        setError={setCategoryError}
    />
  )
}

export default CategorySelector