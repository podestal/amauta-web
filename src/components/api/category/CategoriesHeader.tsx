import { motion } from "framer-motion"
import { Category } from "../../../services/api/categoryService"
import { useEffect } from "react"

interface Props {
    categories: Category[]
    totalWeight: number
    setTotalWeight:  React.Dispatch<React.SetStateAction<number>>
}

const CategoriesHeader = ({ categories, totalWeight, setTotalWeight }: Props) => {

    useEffect(() => {
        const totalWeight = (categories.reduce((sum, category) => sum + category.weight, 0) * 100)
        setTotalWeight(totalWeight)
    }, [categories])
    
    

  return (
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}    
    >
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-6 pt-10">📊 Categorías de Evaluación</h2>

        {/* Total Weight Warning */}
        <div
        className={`text-center font-semibold p-3 rounded-md mb-4 ${
            totalWeight.toFixed(2) === '100.00' ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
        >
        Peso total: {totalWeight.toFixed(2)}%
        {totalWeight.toFixed(2) !== '100.00' && <p>Asegúrate de que el total sea 100%.</p>}
        </div>
    </motion.div>
  )
}

export default CategoriesHeader