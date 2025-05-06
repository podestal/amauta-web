import MDEditor from "@uiw/react-md-editor"
import { PencilLine } from "lucide-react"
import { useState } from "react"
import Modal from "../../ui/Modal"
import useUpdateLesson from "../../../hooks/api/lesson/useUpdateLesson"
import { Lesson } from "../../../services/api/lessonService"
import Button from "../../ui/Button"
import useAuthStore from "../../../hooks/store/useAuthStore"

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

    const handleUpdateLesson = () => {
        updateLesson.mutate({
            access,
            lesson: {
                ...lesson,
                content
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
                <Button 
                    label="Actualizar lección"
                    onClick={() => {
                        handleUpdateLesson()
                        setUpdate(false)
                    }}
                />
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