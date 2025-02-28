import { RiEditFill } from "@remixicon/react"
import { motion } from "framer-motion"
import { Category } from "../../../services/api/categoryService"
import RemoveCategory from "./RemoveCategory"

interface Props {
    category: Category
}

const CategoryCard = ({ category }: Props) => {


  return (
    <>
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
            <RemoveCategory categoryId={category.id} />
            {/* <button onClick={() => {
                setEditing(category.id);
                setNewCategory(category);
            }} className="text-blue-500 hover:text-blue-700">
                <RiEditFill size={20} />
            </button> */}
            </div>
        </motion.div>
    </>
  )
}

export default CategoryCard