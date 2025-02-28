import { RiEditFill } from "@remixicon/react"
import Modal from "../../ui/Modal"
import { useState } from "react"
import { Category } from "../../../services/api/categoryService"
import CategoryForm from "./CategoryForm"
import useUpdateCategory from "../../../hooks/api/category/useUpdateCategory"

interface Props {
    category: Category
}

const UpdateCategory = ({ category }: Props) => {

    const [open, setOpen] = useState(false)

    const updateCategory = useUpdateCategory({ categoryId: category.id })

  return (
    <>
        <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => setOpen(true)}
        >
            <RiEditFill size={20} />
        </button>
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
        >   
            <h2 className="lg:text-2xl mb-6 text-center font-bold">Actualizar Categoría</h2>
            <CategoryForm 
                category={category}
                editing={true}
                updateCategory={updateCategory}
                setOpen={setOpen}
            />
        </Modal>
    </>
  )
}

export default UpdateCategory