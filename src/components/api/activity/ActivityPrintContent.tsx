import { motion } from "framer-motion"
import { Printer } from "lucide-react"
import { useRef, useState } from "react"
import Modal from "../../ui/Modal"
import MarkDownFormat from "../../ui/MarkDownFormat"
import { useReactToPrint } from "react-to-print"
import Button from "../../ui/Button"


interface Props {
  content: string
  title: string
}

const ActivityPrintContent = ({ content, title }: Props) => {

  const [open, setOpen] = useState(false)

  const printRef = useRef<HTMLDivElement>(null)
    
  const handlePrint = useReactToPrint({ 
    contentRef: printRef,
    documentTitle: `Actividad_${title}`,
    onAfterPrint: () => console.log("Impresión completada.")
  })

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

          <>
            <Button 
              label="Imprimir"
              onClick={() => {
                handlePrint()
              }}
            />
            <div
              ref={printRef}
              className="print:px-8 print:py-8 print:w-full print:h-full print:bg-white "
            >
              <MarkDownFormat 
                content={content}
              />
            </div>
          </>

        </Modal>
    </>
  )
}

export default ActivityPrintContent