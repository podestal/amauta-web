import { useEffect } from "react"
import useGetCategories from "../../../hooks/api/category/useGetCategories"
import useAuthStore from "../../../hooks/store/useAuthStore"
import Selector from "../../ui/Selector"

interface Props {
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
    categoryError?: string
    setCategoryError?: React.Dispatch<React.SetStateAction<string>>
    all?: boolean
    categoryRef?: React.RefObject<HTMLSelectElement>
    selectedCategory?: string
    categoryAi?: string
}

const CategorySelector = ({ setCategoryError, setSelectedCategory, categoryError, all, categoryRef, selectedCategory, categoryAi }: Props) => {

    const access = useAuthStore(state => state.access) || ''
    const { data: categories, isLoading, isError, error, isSuccess } = useGetCategories({ access })

    useEffect(() => {
        if (categoryAi) {
            setSelectedCategory(categories?.find(category => category.title.toLocaleLowerCase() === categoryAi.toLocaleLowerCase())?.id.toString() || '')
        }
    }, [categoryAi, categories, setSelectedCategory])

    if (isLoading) return <p className="animate-pulse text-center">Cargando...</p>
    if (isError) return <p>Error: {error.message}</p>
    if (!isSuccess) return <p>No se pudieron cargar las categorías</p>

  return (
    <>
    {categoryAi 
    ? 
    <div className="flex flex-col gap-2 w-full lg:w-[60%] mx-auto justify-center items-center">
      <p className="text-lg lg:text-xl dark:text-slate-50 text-center mb-4">Categoría</p>
      <p>{categories?.find( category => category.title.toLocaleLowerCase() === categoryAi)?.title}</p>
    </div>
   
    : 
    <Selector
        values={all ? [ {id: '0', name: 'Todas'}, ...categories.map(category => ({ id: category.id.toString(), name: category.title }))] : [{id: '0', name: 'Seleciona'}, ...categories.map(category => ({ id: category.id.toString(), name: category.title }))] }
        label="Categoría"
        setter={setSelectedCategory}
        defaultValue={all ? '0' : selectedCategory}
        error={categoryError}
        setError={setCategoryError}
        ref={categoryRef}
    />}
    </>
  )
}

export default CategorySelector