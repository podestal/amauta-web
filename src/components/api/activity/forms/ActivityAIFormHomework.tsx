import { useState } from "react"
import Selector from "../../../ui/Selector"
import NumberSelector from "../../../ui/AIForms/NumberSelector"
import SelectorNew from "../../../ui/AIForms/SelectorNew"
import DifficultySelector from "../../../ui/AIForms/DifficultySelector"
import ContextInput from "../../../ui/AIForms/ContextInput"

// 'ejercicios': 'Ejercicios',
// 'preguntas de reflexión': 'Preguntas de Reflexión',
// 'investigación': 'Investigación',
// 'problemas del mundo real': 'Problemas del Mundo Real',
// 'lectura y resumen': 'Lectura y Resumen',

const homeworkType = [
    { id: 'ejercicios', name: 'Ejercicios' },
    { id: 'preguntas de reflexión', name: 'Preguntas de Reflexión' },
    { id: 'investigación', name: 'Investigación' },
    { id: 'problemas del mundo real', name: 'Problemas del Mundo Real' },
    { id: 'lectura y resumen', name: 'Lectura y Resumen' },
]

const options = [
    'Ejercicios',
    'Preguntas de Reflexión',
    'Investigación',
    'Problemas del Mundo Real',
    'Lectura y Resumen',
]

const ActivityAIFormHomework = () => {

    const [selectedHomeworkType, setSelectedHomeworkType] = useState('Ejercicios')
    const [numberOfQuestions, setNumberOfQuestions] = useState(1)
    const [selectedDifficulty, setSelectedDifficulty] = useState('Media')
    const [context, setContext] = useState('')

  return (
    <form>
        <h2 className="text-center mb-8 text-2xl font-bold">Nueva Tarea</h2>
        <div className="w-full flex gap-10 justify-between items-start">
        <SelectorNew 
            value={selectedHomeworkType}
            setValue={setSelectedHomeworkType}
            options={options}
        />  
        <div className="flex flex-col gap-4">
        <NumberSelector 
            value={numberOfQuestions}
            setValue={setNumberOfQuestions}
        />
        <DifficultySelector 
            value={selectedDifficulty}
            setValue={setSelectedDifficulty}
        />
        {/* observations context */}
        </div>

        </div>
        <div className="w-full flex gap-10 mt-6">
            <ContextInput 
                value={context}
                setValue={setContext}
            />
        </div>
        <div className="w-full flex justify-center items-center mt-8">
        <button 
                // onClick={() => setOpen(true)}
                className="relative inline-flex items-center justify-center px-[1px] py-[1px] rounded-lg bg-transparent text-white font-semibold overflow-hidden">
            <span className="absolute inset-0 rounded-lg p-[1px] bg-[conic-gradient(from_0deg,red,orange,yellow,green,blue,indigo,violet,red)] animate-pulse hover:text-slate-200 z-0"></span>
            <span className="relative z-10 bg-slate-950 hover:opacity-90 transition-opacity rounded-lg px-6 py-2">
                Nueva Actividad
            </span>
        </button>
        </div>
    </form>
  )
}

export default ActivityAIFormHomework