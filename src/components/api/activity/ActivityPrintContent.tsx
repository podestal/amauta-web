import { motion } from "framer-motion"
import { Printer } from "lucide-react"
import { useState } from "react"
import Modal from "../../ui/Modal"
import MarkDownFormat from "../../ui/MarkDownFormat"


interface Props {
  content: string
}

const ActivityPrintContent = ({ content }: Props) => {

  const [open, setOpen] = useState(false)

  return (
    <>
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="">
            <Printer 
                className="text-white transition-transform duration-200 transform hover:scale-110 cursor-pointer p-2 rounded-full bg-blue-500 shadow-md"
                size={32}
                onClick={(e) => {
                    e.stopPropagation()
                    setOpen(true)
                }}
            />
        </motion.div>
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            whole
        >
          <MarkDownFormat 
            content={content}
          />

        </Modal>
    </>
  )
}

export default ActivityPrintContent