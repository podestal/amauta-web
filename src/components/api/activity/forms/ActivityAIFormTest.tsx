import { useEffect, useState } from "react"
import MultiSelectorNew from "../../../ui/AIForms/MultiSelectorNew"
import AIButton from "../../../ui/AIForms/AIButton"
import NumberSelector from "../../../ui/AIForms/NumberSelector"
import DifficultySelector from "../../../ui/AIForms/DifficultySelector"
import getAIResponse from "../../../../utils/getAiResponse"
import { Lesson } from "../../../../services/api/lessonService"
import LoaderAI from "../../../ui/LoaderAI"

interface Props {
    lessons: Lesson[]
    age: number
    markdown: string
    setMarkdown: React.Dispatch<React.SetStateAction<string>>
    setAITitle: React.Dispatch<React.SetStateAction<string>>
}

const typeOfQuestionsOptions = [
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

const ActivityAIFormTest = ({ lessons, age, markdown, setMarkdown, setAITitle }: Props) => {

    const [typeOfQuestions, setTypeOfQuestions] = useState(['Opción Múltiple'])
    const [numberOfQuestions, setNumberOfQuestions] = useState(10)
    const [skillsToEvaluate, setSkillsToEvaluate] = useState(['Aplicación'])
    const [selectedDifficulty, setSelectedDifficulty] = useState('Media')
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
            category: 'evaluación',
            topic: lessonTopics,
            age: age,
            lesson: lessonContent,
            setMarkdown,
            typeOfQuestions,
            numberOfQuestions,
            skillsToEvaluate,
            difficulty: selectedDifficulty,
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
        <h2 className="text-center mb-8 text-2xl font-bold">Nueva Evaluación</h2>
        <div className="w-full flex gap-10 justify-between items-start">
            <MultiSelectorNew 
                value={typeOfQuestions}
                setValue={setTypeOfQuestions}
                options={typeOfQuestionsOptions}
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
    }
    </>
  )
}

export default ActivityAIFormTest