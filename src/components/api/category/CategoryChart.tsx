import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Category } from "../../../services/api/categoryService"

interface Props {
  categories: Category[]
  totalWeight: number
}

const CategoryChart = ({ categories, totalWeight }: Props) => {
  return (
    <div className="mt-8 mb-20">
        <h3 className="text-xl font-bold text-center mb-4">📈 Distribución de Peso</h3>
        <ResponsiveContainer width="100%" height={250}>
        <BarChart data={categories}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="weight" fill={(totalWeight).toFixed(2) === '100.00' ? "#3b82f6" : "#F44336"} radius={[5, 5, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CategoryChart