import { useState } from "react"
import NumberSelector from "../../../ui/AIForms/NumberSelector"
import SelectorNew from "../../../ui/AIForms/SelectorNew"
import DifficultySelector from "../../../ui/AIForms/DifficultySelector"
import ContextInput from "../../../ui/AIForms/ContextInput"
import AIButton from "../../../ui/AIForms/AIButton"


const options = [
    'Ejercicios',
    'Preguntas de Reflexión',
    'Investigación',
    'Problemas del Mundo Real',
    'Lectura y Resumen',
]

const ActivityAIFormHomework = () => {

    const [selectedHomeworkType, setSelectedHomeworkType] = useState('Ejercicios')
    const [numberOfQuestions, setNumberOfQuestions] = useState(5)
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
            label="Tipo de Tarea"
        />  
        <div className="flex flex-col gap-4">
        <NumberSelector 
            value={numberOfQuestions}
            setValue={setNumberOfQuestions}
            label="Número de Preguntas"
        />
        <DifficultySelector 
            value={selectedDifficulty}
            setValue={setSelectedDifficulty}
            options={['Fácil', 'Media', 'Díficil']}
            label="Dificultad"
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
        <AIButton 
            label="Generar Tarea"
            onClick={() => console.log('Generar Tarea')}
        />
    </form>
  )
}

export default ActivityAIFormHomework