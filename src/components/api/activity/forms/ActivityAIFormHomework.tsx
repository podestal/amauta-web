import { useEffect, useState } from "react"
import NumberSelector from "../../../ui/AIForms/NumberSelector"
import SelectorNew from "../../../ui/AIForms/SelectorNew"
import DifficultySelector from "../../../ui/AIForms/DifficultySelector"
import ContextInput from "../../../ui/AIForms/ContextInput"
import AIButton from "../../../ui/AIForms/AIButton"
import getAIResponse from "../../../../utils/getAiResponse"
import { Lesson } from "../../../../services/api/lessonService"
import LoaderAI from "../../../ui/LoaderAI"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"

interface Props {
    lessons: Lesson[]
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

const ActivityAIFormHomework = ({ lessons, age, markdown, setMarkdown, setAITitle }: Props) => {

    const [selectedHomeworkType, setSelectedHomeworkType] = useState('Ejercicios')
    const [numberOfQuestions, setNumberOfQuestions] = useState(5)
    const [selectedDifficulty, setSelectedDifficulty] = useState('Media')
    const [context, setContext] = useState('')
    const [loading, setLoading] = useState(false)
    const lessonTopics = lessons?.map(lesson => lesson.subject).join(', ') || ''
    const lessonContent = lessons?.map(lesson => lesson.content).join('\n') || ''
    const { setMessage, setShow, setType } = useNotificationsStore()

    useEffect(() => {
        if (markdown) {
            setLoading(false)
        }
    })

    const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault()

        if (lessons.length === 0) {
            setMessage('No hay lecciones seleccionadas')
            setShow(true)
            setType('error')
            return
        }
        
        setLoading(true)
        await getAIResponse({
            category: 'tarea',
            topic: lessonTopics,
            age: age,
            lesson: lessonContent,
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
        <div className="w-full lg:flex flex-col gap-12 justify-between items-start">
            <SelectorNew 
                value={selectedHomeworkType}
                setValue={setSelectedHomeworkType}
                options={options}
                label="Tipo de Tarea"
            />  
            <div className="flex flex-col gap-4 max-lg:mt-10">
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