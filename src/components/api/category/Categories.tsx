import { motion } from "framer-motion"
import useGetCategories from "../../../hooks/api/category/useGetCategories"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLoader from "../../../hooks/ui/useLoader"
import CategoriesHeader from "./CategoriesHeader"
import { useState } from "react"
import CategoryChart from "./CategoryChart"
import CreateCategory from "./CreateCategory"
import CategoryCard from "./CategoryCard"

const Categories = () => {

    const access = useAuthStore(s => s.access) || ''
    const [totalWeight, setTotalWeight] = useState(0)
    const { data: categories, isLoading, isError, error, isSuccess } = useGetCategories({ access })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) 

  return (
    <div className="w-full max-w-4xl mx-auto p-6 shadow-lg rounded-lg overflow-scroll">
        <CategoriesHeader 
            categories={categories}
            setTotalWeight={setTotalWeight}
            totalWeight={totalWeight}
        />
        <CreateCategory />
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="dark:bg-gray-900 bg-slate-200 p-4 rounded-lg shadow-md">
            {categories.map((category) => (
                <CategoryCard 
                    key={category.id} 
                    category={category} 
                />
            ))}
            <CategoryChart categories={categories} totalWeight={totalWeight} />
        </motion.div>
    </div>
  )
}

export default Categories