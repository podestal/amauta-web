import MDEditor from "@uiw/react-md-editor"
import { PencilLine } from "lucide-react"
import { useState } from "react"
import Modal from "../../ui/Modal"
import useUpdateLesson from "../../../hooks/api/lesson/useUpdateLesson"
import { Lesson } from "../../../services/api/lessonService"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useNotificationsStore from "../../../hooks/store/useNotificationsStore"
import { Loader } from "lucide-react"

interface Props {
    lesson: Lesson
    assignatureId: string
    quarter: string
}

const UpdateLesson = ({ lesson, assignatureId, quarter }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const [update, setUpdate] = useState(false)
    const updateLesson = useUpdateLesson({ assignatureId, quarter, lessonId: (lesson.id).toString() })
    const [content, setContent] = useState(lesson.content)

    const { setMessage, setShow, setType } = useNotificationsStore()
    const [loading, setLoading] = useState(false)

    const handleUpdateLesson = () => {
        updateLesson.mutate({
            access,
            lesson: {
                ...lesson,
                content
            }
        }, {
            onSuccess: () => {
                setMessage('Lección actualizada')
                setShow(true)
                setType('success')
                setUpdate(false)
            },
            onError: (err) => {
                console.error('Error al actualizar la lección', err)
                setMessage('Error al actualizar la lección')
                setShow(true)
                setType('error')
            },
            onSettled: () => {
                setLoading(false)
            }
        })
    }

  return (
    <>
        <button className="text-sm text-blue-600 dark:text-blue-400">
            <PencilLine 
                onClick={() => setUpdate(true)}
                className="text-blue-600 dark:text-blue-500 hover:opacity-70 cursor-pointer" 
            />
        </button>
        <Modal
            isOpen={update}
            onClose={() => setUpdate(false)}
            whole
        >

            <div className="flex flex-col justify-between items-center gap-8 mb-4">
                <button
                    onClick={() => {
                        setLoading(true)
                        handleUpdateLesson()
                    }}
                    className="text-sm font-bold bg-blue-600 text-white px-2 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                >
                    {loading
                    ?
                    <Loader className="animate-spin" />
                    :
                    <span>Actualizar lección</span>
                    }
                </button>
                <MDEditor
                    value={content}
                    onChange={e => setContent(e || "")}
                    height={600}
                />
            </div>
        </Modal>
    </>
  )
}

export default UpdateLesson