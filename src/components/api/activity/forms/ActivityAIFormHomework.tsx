import { useEffect, useState } from "react"
import NumberSelector from "../../../ui/AIForms/NumberSelector"
import SelectorNew from "../../../ui/AIForms/SelectorNew"
import DifficultySelector from "../../../ui/AIForms/DifficultySelector"
import ContextInput from "../../../ui/AIForms/ContextInput"
import AIButton from "../../../ui/AIForms/AIButton"
import getAIResponse from "../../../../utils/getAiResponse"
import { Lesson } from "../../../../services/api/lessonService"
import LoaderAI from "../../../ui/LoaderAI"

interface Props {
    lesson: Lesson
    age: number
    markdown: string
    setMarkdown: React.Dispatch<React.SetStateAction<string>>
    setAITitle: React.Dispatch<React.SetStateAction<string>>
}

const options = [
    'Ejercicios',
    'Preguntas de Reflexión',
    'Investigación',
    'Problemas del Mundo Real',
    'Lectura y Resumen',
]

const ActivityAIFormHomework = ({ lesson, age, markdown, setMarkdown, setAITitle }: Props) => {

    const [selectedHomeworkType, setSelectedHomeworkType] = useState('Ejercicios')
    const [numberOfQuestions, setNumberOfQuestions] = useState(5)
    const [selectedDifficulty, setSelectedDifficulty] = useState('Media')
    const [context, setContext] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (markdown) {
            setLoading(false)
        }
    })

    const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await getAIResponse({
            category: 'tarea',
            topic: lesson.subject,
            age: age,
            lesson: lesson.content,
            setMarkdown,
            homeworkType: selectedHomeworkType,
            numberOfQuestions,
            difficulty: selectedDifficulty,
            context,
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
        </div>

        </div>
        <div className="w-full flex gap-10 mt-6">
            <ContextInput 
                value={context}
                setValue={setContext}
                label='Contexto de la lección'
                placeholder="Escribe aquí el contexto de la lección, incluyendo objetivos, introducción, etc..."
            />
        </div>
        <AIButton 
            label="Generar Tarea"
            onClick={() => console.log('Generar Tarea')}
        />
    </form>
    }
    </>
  )
}

export default ActivityAIFormHomework