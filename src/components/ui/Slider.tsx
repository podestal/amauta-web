import { RiCloseCircleFill } from "@remixicon/react"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"

interface Props {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: ReactNode;
}

const Slider = ({ isOpen, setOpen, children }: Props) => {
  return (
    <>
      {/* Background overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sliding panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="fixed right-0 top-0 w-[600px] h-full bg-slate-950 z-30 shadow-xl shadow-slate-400 dark:shadow-slate-700 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-8 right-6 text-gray-600 hover:text-gray-900"
            >
              <RiCloseCircleFill className="text-red-500" size={30} />
            </button>

            {/* Scrollable content wrapper */}
            <div className="flex-1 overflow-y-auto p-6 mt-10">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Slider
