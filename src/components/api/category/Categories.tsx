import { motion } from "framer-motion"
import useGetCategories from "../../../hooks/api/category/useGetCategories"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useLoader from "../../../hooks/ui/useLoader"
import CategoriesHeader from "./CategoriesHeader"
import { RiDeleteBin6Fill, RiEditFill } from "@remixicon/react"
import { useState } from "react"
import CategoryChart from "./CategoryChart"

const Categories = () => {

    const access = useAuthStore(s => s.access) || ''
    const [totalWeight, setTotalWeight] = useState(0)
    const { data: categories, isLoading, isError, error, isSuccess } = useGetCategories({ access })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) 

  return (
    <div className="w-full max-w-4xl mx-auto p-6 shadow-lg rounded-lg pb-20">
        <CategoriesHeader 
            categories={categories}
            setTotalWeight={setTotalWeight}
            totalWeight={totalWeight}
        />
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 p-4 rounded-lg shadow-md">
            {categories.map((category) => (
            <motion.div
                key={category.id}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg shadow mb-4 hover:bg-gray-700 cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="font-semibold">{category.title} - {category.weight * 100}%</span>
                <div className="flex gap-2">
                <button
                    className="text-blue-500 hover:text-blue-700"
                >
                    <RiEditFill size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                    <RiDeleteBin6Fill size={20} />
                </button>
                {/* <button onClick={() => {
                    setEditing(category.id);
                    setNewCategory(category);
                }} className="text-blue-500 hover:text-blue-700">
                    <RiEditFill size={20} />
                </button> */}
                {/* <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700">
                    <RiDeleteBin6Fill size={20} />
                </button> */}
                </div>
            </motion.div>
            ))}
            <CategoryChart categories={categories} totalWeight={totalWeight} />
        </motion.div>
    </div>
  )
}

export default Categories