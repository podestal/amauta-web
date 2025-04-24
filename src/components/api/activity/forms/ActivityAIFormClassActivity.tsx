import { useState } from "react"
import SelectorNew from "../../../ui/AIForms/SelectorNew"
import AIButton from "../../../ui/AIForms/AIButton"
import NumberSelector from "../../../ui/AIForms/NumberSelector"
import DifficultySelector from "../../../ui/AIForms/DifficultySelector"

const typeOfActivityOptions = [
    'Individual',
    'En parejas',
    'En grupos',
    'Juego Educativo',
    'Debate/Discusión',
]

const ActivityAIFormClassActivity = () => {

    const [typeOfActivity, setTypeOfActivity] = useState('Individual')
    const [durationOfActivity, setDurationOfActivity] = useState(15)
    const [levelOfInteraction, setLevelOfInteraction] = useState('Medio')

  return (
    <form>
        <h2 className="text-center mb-8 text-2xl font-bold">Nuevo Trabajo en Clase</h2>
        <div className="w-full flex gap-10 justify-between items-start">
        <SelectorNew 
            value={typeOfActivity}
            setValue={setTypeOfActivity}
            options={typeOfActivityOptions}
            label="Tipo de Actividad"
        />  
        <div className="flex flex-col gap-4">
            <NumberSelector 
                value={durationOfActivity}
                setValue={setDurationOfActivity}
                label="Duración"
                time={true}
            />
            <DifficultySelector 
                value={levelOfInteraction}
                setValue={setLevelOfInteraction}
                options={['Bajo', 'Medio', 'Alto']}
                label="Nivel de Interacción"
            />
        </div>
        {/* <div className="flex flex-col gap-4">
        <NumberSelector 
            value={numberOfQuestions}
            setValue={setNumberOfQuestions}
        />
        <DifficultySelector 
            value={selectedDifficulty}
            setValue={setSelectedDifficulty}
        />
        </div>

        </div>
        <div className="w-full flex gap-10 mt-6">
            <ContextInput 
                value={context}
                setValue={setContext}
            /> */}
        </div>
        <AIButton 
            label="Generar Trabajo en Clase"
            onClick={() => console.log('Generar Tarea')}
        />
    </form>
  )
}

export default ActivityAIFormClassActivity