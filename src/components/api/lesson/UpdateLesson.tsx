import MDEditor from "@uiw/react-md-editor"
import { PencilLine } from "lucide-react"
import { useState } from "react"
import Modal from "../../ui/Modal"

interface Props {
    content: string
}

const UpdateLesson = ({ content }: Props) => {

    const [update, setUpdate] = useState(false)

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
            <MDEditor
                value={content}
                onChange={() => {}}
                height={600}
            />
        </Modal>
    </>
  )
}

export default UpdateLesson