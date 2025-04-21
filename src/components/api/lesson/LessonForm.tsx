import { useState } from "react"
import Input from "../../ui/Input"
import Selector from "../../ui/Selector"
import TextArea from "../../ui/TextArea"

const methodologies = [
    { id: '1', name: 'Clase magistral' },
    { id: '2', name: 'Clase activa' },
    { id: '3', name: 'Clase práctica' },

]

const LessonForm = () => {

    const [topic, setTopic] = useState('')
    const [methodology, setMethodology] = useState('')

  return (
    <form
        className="flex flex-col items-center gap-4 h-full p-4 w-[50%] mx-auto dark:bg-gray-900 bg-slate-200 rounded-2xl shadow-lg"
    >
        <h2 className="mb-8 text-3xl font-bold">Preparar Clase</h2>
        <Input 
            placeholder='Tema'
            label="Tema"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
        />
        <Selector 
            values={methodologies}
            defaultValue={methodology}
            setter={setMethodology}
            label="Metodología"    
            lan="es"
        />
        <TextArea 
            label="Contexto"
            placeholder="Escribe el contexto de la clase"
        />
        <button className="relative inline-flex items-center justify-center px-[1px] py-[1px] rounded-lg bg-transparent text-white  font-semibold overflow-hidden">
            <span className="absolute inset-0 rounded-lg p-[1px] bg-[conic-gradient(from_0deg,red,orange,yellow,green,blue,indigo,violet,red)] animate-pulse hover:text-slate-200 z-0"></span>
            <span className="relative z-10 bg-gray-900 hover:opacity-90 transition-opacity rounded-lg px-6 py-2">
                Crear
            </span>
        </button>
    </form>
  )
}

export default LessonForm