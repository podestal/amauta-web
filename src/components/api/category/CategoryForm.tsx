import { motion } from "framer-motion"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { useState } from "react"
import { Category } from "../../../services/api/categoryService"
import { UseMutationResult } from "@tanstack/react-query"
import { CreateCategoryData } from "../../../hooks/api/category/useCreateCategory"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useNotificationsStore from "../../../hooks/store/useNotificationsStore"

interface Props {
    category?: Category
    editing?: boolean
    createCategory?: UseMutationResult<Category, Error, CreateCategoryData>
}


const CategoryForm = ({ category, editing, createCategory }: Props) => {

    const access = useAuthStore(state => state.access) || ''
    const instructor = useGetProfileStore(state => state.profile)
    const [name, setName] = useState(category ? category.title : '')
    const [weight, setWeight] = useState(category ? category.weight : 0)
    const { setMessage, setShow, setType } = useNotificationsStore()

    const handleUpdate = () => {}

    const handleAddCategory = () => {
        createCategory && createCategory.mutate({
            access,
            category: {
                title: name,
                weight: weight,
                instructor: instructor ? instructor.id : 0
            }
        }
        , {
            onSuccess: () => {
                setMessage('Categoría añadida')
                setType('success')
                setShow(true)
                setName('')
                setWeight(0)
            },
            onError: () => {
                setMessage('Error al añadir la categoría')
                setType('error')
                setShow(true)
            }
        })
    }

  return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 mb-6">
        <Input 
            name="name"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <Input 
            name="weight"
            placeholder="Peso (ej. 0.3)"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            type="number"
            min="0"
            step="0.01"
        />
        {editing ? (
          <Button onClick={handleUpdate} label="Actualizar" />
        ) : (
          <Button onClick={handleAddCategory} label="Añadir" />
        )}
      </motion.div>
  )
}

export default CategoryForm