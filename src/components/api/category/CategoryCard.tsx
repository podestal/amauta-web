
import { motion } from "framer-motion"
import { Category } from "../../../services/api/categoryService"
// import RemoveCategory from "./RemoveCategory"
import UpdateCategory from "./UpdateCategory"

interface Props {
    category: Category
}

const CategoryCard = ({ category }: Props) => {


  return (
    <>
        <motion.div
            key={category.id}
            className="flex justify-between items-center dark:bg-gray-800 bg-slate-300 p-3 rounded-lg shadow mb-4 hover:bg-slate-400 dark:hover:bg-gray-700 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <span className="font-semibold">{category.title} - {category.weight * 100}%</span>
            <div className="flex gap-4">
            <UpdateCategory category={category} />
            {/* <RemoveCategory categoryId={category.id} /> */}
            </div>
        </motion.div>
    </>
  )
}

export default CategoryCard