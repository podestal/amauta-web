import { useEffect, useState } from "react"
import SelectorNew from "../../../ui/AIForms/SelectorNew"
import AIButton from "../../../ui/AIForms/AIButton"
import NumberSelector from "../../../ui/AIForms/NumberSelector"
import DifficultySelector from "../../../ui/AIForms/DifficultySelector"
import { Lesson } from "../../../../services/api/lessonService"
import getAIResponse from "../../../../utils/getAiResponse"
import LoaderAI from "../../../ui/LoaderAI"

interface Props {
    lessons: Lesson[]
    age: number
    markdown: string
    setMarkdown: React.Dispatch<React.SetStateAction<string>>
    setAITitle: React.Dispatch<React.SetStateAction<string>>
}


const typeOfActivityOptions = [
    'Individual',
    'En parejas',
    'En grupos',
    'Juego Educativo',
    'Debate/Discusión',
]

const ActivityAIFormClassActivity = ({ lessons, age, markdown, setMarkdown, setAITitle }: Props) => {

    const [typeOfActivity, setTypeOfActivity] = useState('Individual')
    const [durationOfActivity, setDurationOfActivity] = useState(15)
    const [levelOfInteraction, setLevelOfInteraction] = useState('Medio')
    const [loading, setLoading] = useState(false)
    const lessonTopics = lessons?.map(lesson => lesson.subject).join(', ') || ''
    const lessonContent = lessons?.map(lesson => lesson.content).join('\n') || ''

    useEffect(() => {
        if (markdown) {
            setLoading(false)
        }
    })

    const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await getAIResponse({
            category: 'trabajo en clase',
            topic: lessonTopics,
            age: age,
            lesson: lessonContent,
            setMarkdown,
            typeOfActivity,
            durationOfActivity,
            levelOfInteraction,
            setAITitle
        })
    }

  return (
    <>
    {loading 
    ? 
    <LoaderAI /> 
    : 
    <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-6 p-6 "
    >
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
        </div>
        <AIButton 
            label="Generar Trabajo en Clase"
            onClick={() => console.log('Generar Tarea')}
        />
    </form>
    }
    </>
  )
}

export default ActivityAIFormClassActivity