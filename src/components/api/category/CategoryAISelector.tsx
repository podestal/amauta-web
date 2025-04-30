import { motion } from "framer-motion";
import useNotificationsStore from "../../../hooks/store/useNotificationsStore";
import { useState } from "react";

interface Props {
    markdown: string
    category: string
    setCategory: (category: string) => void
    setOpen: (open: boolean) => void
    iconMap: { name: string; icon: React.FC<{ className?: string }>; color: string }[]
    lesson?: boolean
}

const CategoryAISelector = ({ markdown, category, setCategory, setOpen, iconMap, lesson=false }: Props) => {

    const { setMessage, setShow, setType } = useNotificationsStore()
    const [active, setActive] = useState('')

  return (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={{
        visible: {
            transition: {
            staggerChildren: 0.1,
            },
        },
        }}
    >
        <div className={`grid grid-cols-2 sm:grid-cols-3 ${lesson ? 'md:grid-cols-4' : 'md:grid-cols-5'}  gap-4`}>
            {iconMap.map(({ name, icon: Icon, color }) => (
                <>
                {lesson ? 
                <motion.button
                    key={name}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-${color} shadow-xl shadow-slate-500`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (markdown) {
                            if (name.toLocaleLowerCase() === category ) {
                                setOpen(true)
                            } else {
                                setMessage(`Por favor, completa la actividad ${category} antes de continuar`)
                                setShow(true)
                                setType('error')
                            }
                            // setCategory(name.toLocaleLowerCase())
                        } else {
                            setCategory(name.toLocaleLowerCase());
                            setOpen(true);
                        };
                    }}
                >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="dark:text-slate-50 text-black text-sm font-medium">{name}</span>
                </motion.button> 
                : 
                <motion.button
                    key={name}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-${color} shadow-xl shadow-slate-500`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (active === name) {
                            setActive('')
                        } else {
                            setActive(name)
                        }
                        
                    }}
                >
                    <Icon className={`w-6 h-6 mb-2 ${active === name ? `text-${color}` : 'text-slate-50'}`} />
                    <span className="dark:text-slate-50 text-black text-sm font-medium">{name}</span>
                </motion.button>
                }
                </>
            ))}
        </div>
    </motion.div>
  )
}

export default CategoryAISelector