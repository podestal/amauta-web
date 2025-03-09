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
import { UpdateCategoryData } from "../../../hooks/api/category/useUpdateCategory"

interface Props {
    category?: Category
    editing?: boolean
    createCategory?: UseMutationResult<Category, Error, CreateCategoryData>
    updateCategory?: UseMutationResult<Category, Error, UpdateCategoryData>
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}


const CategoryForm = ({ category, editing, createCategory, updateCategory, setOpen }: Props) => {

    const access = useAuthStore(state => state.access) || ''
    const instructor = useGetProfileStore(state => state.profile)
    const [name, setName] = useState(category ? category.title : '')
    const [weight, setWeight] = useState(category ? (category.weight*100).toString() : '')
    const { setMessage, setShow, setType } = useNotificationsStore()
    const [loading, setLoading] = useState(false)

    // ERROR HANDLING
    const [nameError, setNameError] = useState('')
    const [weightError, setWeightError] = useState('')

    const handleUpdate = () => {

        if (!name) {
            setNameError('El nombre es requerido')
            return
        }

        if (!weight) {
            setWeightError('El peso es requerido')
            return
        }


        
        const normalizedWeight = (parseInt(weight)/100)
        console.log('normalizedWeight', normalizedWeight);
        

        setLoading(true)
        updateCategory && updateCategory.mutate({
            access,
            category: {
                title: name,
                weight: normalizedWeight, 
                instructor: instructor ? instructor.id : 0
            }
        }
        , {
            onSuccess: () => {
                setMessage('Categoría actualizada')
                setType('success')
                setShow(true)
                setOpen && setOpen(false)
            },
            onError: () => {
                setMessage('Error al actualizar la categoría')
                setType('error')
                setShow(true)
            },
            onSettled: () => setLoading(false)
        })
    }

    const handleAddCategory = () => {

        if (!name) {
            setNameError('El nombre es requerido')
            return
        }

        if (!weight) {
            setWeightError('El peso es requerido')
            return
        }
        console.log('weight', weight);
        const normalizedWeight = parseInt(weight)/100
        console.log('normalizedWeight', normalizedWeight);

        setLoading(true)
        createCategory && createCategory.mutate({
            access,
            category: {
                title: name,
                weight: normalizedWeight,
                instructor: instructor ? instructor.id : 0
            }
        }
        , {
            onSuccess: () => {
                setMessage('Categoría añadida')
                setType('success')
                setShow(true)
                setName('')
                setWeight('')
            },
            onError: () => {
                setMessage('Error al añadir la categoría')
                setType('error')
                setShow(true)
            },
            onSettled: () => setLoading(false)
        })
    }

  return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col ${!editing ? 'md:flex-row' : 'md:flex-col'} gap-4 mb-6 justify-center items-center`}>
        <Input 
            name="name"
            placeholder="Nombre"
            value={name}
            onChange={(e) =>{
                name && setNameError('')
                setName(e.target.value)}}
            error={nameError}
        />
        <Input 
            name="weight"
            placeholder="Peso (ejm 20)"
            value={weight}
            onChange={(e) => {
                weight && setWeightError('')
                setWeight(e.target.value)}}
            type="number"
            min="0"
            step="0.01"
            error={weightError}
        />
        {editing ? (
        <div>
            <Button 
                onClick={handleUpdate} 
                label="Actualizar" 
                loading={loading}
                minWidth
                
            />
        </div>
        ) : (
          <Button 
            onClick={handleAddCategory} 
            label="Añadir" 
            loading={loading}
            minWidth
        />
        )}
      </motion.div>
  )
}

export default CategoryForm