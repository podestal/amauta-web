import { useEffect, useState } from "react"
import AIButton from "../../../ui/AIForms/AIButton"
import NumberSelector from "../../../ui/AIForms/NumberSelector"
import DifficultySelector from "../../../ui/AIForms/DifficultySelector"
import { Lesson } from "../../../../services/api/lessonService"
import getAIResponse from "../../../../utils/getAiResponse"
import LoaderAI from "../../../ui/LoaderAI"
import ContextInput from "../../../ui/AIForms/ContextInput"
import MultiSelectorNew from "../../../ui/AIForms/MultiSelectorNew"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"

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

const ActivityAIFormFinal = ({ lessons, age, markdown, setMarkdown, setAITitle }: Props) => {

    const [typeOfQuestions, setTypeOfQuestions] = useState(['Opción Múltiple'])
    const [numberOfQuestions, setNumberOfQuestions] = useState(10)
    const [skillsToEvaluate, setSkillsToEvaluate] = useState(['Aplicación'])
    const [selectedDifficulty, setSelectedDifficulty] = useState('Media')
    const [finalContext, setFinalContext] = useState('')
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
        // category: 'evaluación',
        // topic: lessonTopics,
        // age: age,
        // lesson: lessonContent,
        // setMarkdown,
        // typeOfQuestions,
        // numberOfQuestions,
        // skillsToEvaluate,
        // difficulty: selectedDifficulty,
        // setAITitle
        await getAIResponse({
            category: 'examen',
            topic: lessonTopics,
            age: age,
            lesson: lessonContent,
            setMarkdown,
            typeOfQuestions,
            numberOfQuestions,
            skillsToEvaluate,
            difficulty: selectedDifficulty,
            context: finalContext,
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
        <h2 className="text-center mb-8 text-2xl font-bold">Nuevo Examen</h2>
        <div className="w-full lg:flex max-lg:flex-col gap-10 justify-between items-start">
            <MultiSelectorNew 
                value={typeOfQuestions}
                setValue={setTypeOfQuestions}
                options={typeOfQuestionsOptions}
                label="Tipo de Preguntas"
            />  
            <div className="w-full h-8 lg:hidden"></div>
            <div className="flex flex-col gap-4">
                <MultiSelectorNew 
                    value={skillsToEvaluate}
                    setValue={setSkillsToEvaluate}
                    options={skillsToEvaluateOptions}
                    label="Habilidades a evaluar"
                /> 
            </div>
        </div>
        <div className="w-full lg:flex max-lg:flex-col gap-10 mt-6">
            <NumberSelector 
                value={numberOfQuestions}
                setValue={setNumberOfQuestions}
                label="Número de Preguntas"
            />
            <div className="w-full h-8 lg:hidden"></div>
            <DifficultySelector 
                value={selectedDifficulty}
                setValue={setSelectedDifficulty}
                options={['Fácil', 'Media', 'Díficil']}
                label="Dificultad"
            />
        </div>
        <div className="col-span-2">
                <ContextInput 
                    value={finalContext}
                    setValue={setFinalContext}
                    label='Herramientas y recursos'
                    placeholder='Escribe aquí el contexto que quieres que tenga el examen ...'
                />
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

export default ActivityAIFormFinal