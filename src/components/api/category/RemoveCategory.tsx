import { RiDeleteBin6Fill } from "@remixicon/react"
import { useState } from "react"
import useNotificationsStore from "../../../hooks/store/useNotificationsStore"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useRemoveCategory from "../../../hooks/api/category/useRemoveCategory"
import Modal from "../../ui/Modal"

interface Props {
    categoryId: number
}

const RemoveCategory = ({ categoryId }: Props) => {

    const [open, setOpen] = useState(false)
    const { setMessage, setShow, setType } = useNotificationsStore()
    const access = useAuthStore(state => state.access) || ''
    const deleteCategory = useRemoveCategory({ categoryId })

    const handleRemoveCategory = () => {
        deleteCategory.mutate(
            { access },
            {
                onSuccess: () => {
                    setMessage('Categoría eliminada')
                    setType('success')
                    setShow(true)
                    setOpen(false)
                },
                onError: () => {
                    setMessage('Error al eliminar la categoría')
                    setType('error')
                    setShow(true)
                    setOpen(false)
                }
            }
        )
    }

  return (
    <>
        <button 
            onClick={() => setOpen(true)}
            className="text-red-500 hover:text-red-700">
            <RiDeleteBin6Fill size={20} />
        </button>
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <div className="w-full flex justify-center items-center flex-col gap-8 p-4">
                <h2 className="lg:text-2xl font-bold text-center">Está seguro de eliminar esta categoría?</h2>
                <div className="flex gap-10">
                    <button onClick={handleRemoveCategory} className="bg-red-500 text-white p-2 rounded-lg">Eliminar</button>
                    <button onClick={() => setOpen(false)} className="bg-blue-500 text-white p-2 rounded-lg">Cancelar</button>
                </div>
            </div>
        </Modal>
    </>
  )
}

export default RemoveCategory