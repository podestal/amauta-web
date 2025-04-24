import { useState } from "react"
import MultiSelectorNew from "../../../ui/AIForms/MultiSelectorNew"
import AIButton from "../../../ui/AIForms/AIButton"
import NumberSelector from "../../../ui/AIForms/NumberSelector"
import DifficultySelector from "../../../ui/AIForms/DifficultySelector"

const typeOfQuestions = [
    'Opción Múltiple',
    'Verdadero o Falso',
    'Respuesta Corta',
    'Respuesta Larga',
    'Ejercicios para Resolver',
]

const skillsToEvaluateOptions = [
    'Identificación',
    'Aplicación',
    'Comprensión',
    'Análisis',
    'Síntesis',
    'Evaluación',
]

const ActivityAIFormTest = () => {

    const [typeOfActivity, setTypeOfActivity] = useState(['Opción Múltiple'])
    const [numberOfQuestions, setNumberOfQuestions] = useState(10)
    const [skillsToEvaluate, setSkillsToEvaluate] = useState(['Aplicación'])
    const [selectedDifficulty, setSelectedDifficulty] = useState('Media')

  return (
    <form>
        <h2 className="text-center mb-8 text-2xl font-bold">Nueva Evaluación</h2>
        <>{console.log("typeOfActivity", typeOfActivity)}</>
        <div className="w-full flex gap-10 justify-between items-start">
            <MultiSelectorNew 
                value={typeOfActivity}
                setValue={setTypeOfActivity}
                options={typeOfQuestions}
                label="Tipo de Preguntas"
            />  
            <div className="flex flex-col gap-4">
                <MultiSelectorNew 
                    value={skillsToEvaluate}
                    setValue={setSkillsToEvaluate}
                    options={skillsToEvaluateOptions}
                    label="Habilidades a evaluar"
                /> 
            </div>
        </div>
        <div className="w-full flex gap-10 mt-6">
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
        </div>
 
        <AIButton 
            label="Generar Evaluación"
            onClick={() => console.log('Generar Tarea')}
        />
    </form>
  )
}

export default ActivityAIFormTest