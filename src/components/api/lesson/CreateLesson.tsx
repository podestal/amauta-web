import { useState } from "react"
import Modal from "../../ui/Modal"
import LessonForm from "./LessonForm"

const CreateLesson = () => {

    const [open, setOpen] = useState(false)

  return (
    <>
        <button 
            onClick={() => setOpen(true)}
            className="relative inline-flex items-center justify-center px-[1px] py-[1px] rounded-lg bg-transparent text-white font-semibold overflow-hidden">
        <span className="absolute inset-0 rounded-lg p-[1px] bg-[conic-gradient(from_0deg,red,orange,yellow,green,blue,indigo,violet,red)] animate-pulse hover:text-slate-200 z-0"></span>
        <span className="relative z-10 bg-slate-950 hover:opacity-90 transition-opacity rounded-lg px-6 py-2">
            Nueva Lección
        </span>
        </button>
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            whole
        >
            <LessonForm />
        </Modal>
    </>
  )
}

export default CreateLesson