import { motion } from "framer-motion";
import useNotificationsStore from "../../../hooks/store/useNotificationsStore";
import { useState } from "react";
import { Category } from "../../../services/api/categoryService";
import getCategoriesIconMap from "../../../utils/getCategoriesIconMap";
import { Icon } from "lucide-react";
import React from "react";

interface Props {
    markdown: string
    category: string
    setCategory: (category: string) => void
    setOpen: (open: boolean) => void
    // iconMap: { name: string; icon: React.FC<{ className?: string }>; color: string }[]
    lesson?: boolean
    categories: Category[]
}

const CategoryAISelector = ({ markdown, category, setCategory, setOpen, lesson=false, categories }: Props) => {

    const { setMessage, setShow, setType } = useNotificationsStore()
    const [active, setActive] = useState('')
    const iconMap = getCategoriesIconMap({ categories, exam: false });

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
            {iconMap.map((icon) => (
                <>
                <>{console.log('icon', icon)}</>
                {lesson ? 
                <motion.button
                    key={icon.id}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-${icon.color} shadow-xl shadow-slate-500`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (markdown) {
                            if (icon.title.toLocaleLowerCase() === category ) {
                                setOpen(true)
                            } else {
                                setMessage(`Por favor, completa la actividad ${category} antes de continuar`)
                                setShow(true)
                                setType('error')
                            }
                            // setCategory(name.toLocaleLowerCase())
                        } else {
                            setCategory(icon.title.toLocaleLowerCase());
                            setOpen(true);
                        };
                    }}
                >
                    {React.createElement(icon.icon, { className: `w-6 h-6 mb-2 text-${icon.color}` })}
                    <span className="dark:text-slate-50 text-black text-sm font-medium">{icon.title}</span>
                </motion.button> 
                : 
                <motion.button
                    key={icon.title}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-${icon.color} shadow-xl shadow-slate-500`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (active === icon.title) {
                            setActive('')
                            setCategory('')
                        } else {
                            setActive(icon.title)
                            setCategory(icon.title.toLocaleLowerCase());
                        }
                        
                    }}
                >
                    {React.createElement(icon.icon, { className: `w-6 h-6 mb-2 text-${icon.color}` })}
                    <span className="dark:text-slate-50 text-black text-sm font-medium">{icon.title}</span>
                </motion.button>
                }
                </>
            ))}
        </div>
    </motion.div>
  )
}

export default CategoryAISelector
