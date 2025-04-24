import { useEffect, useState } from "react"
import AIButton from "../../../ui/AIForms/AIButton"
import DifficultySelector from "../../../ui/AIForms/DifficultySelector"
import SelectorNew from "../../../ui/AIForms/SelectorNew"
import MultiSelectorNew from "../../../ui/AIForms/MultiSelectorNew"
import ContextInput from "../../../ui/AIForms/ContextInput"
import { Lesson } from "../../../../services/api/lessonService"
import getAIResponse from "../../../../utils/getAiResponse"
import LoaderAI from "../../../ui/LoaderAI"

interface Props {
    lesson: Lesson
    age: number
    markdown: string
    setMarkdown: React.Dispatch<React.SetStateAction<string>>
}

const projectTypeOptions = [
    'Individual',
    'En parejas',
    'En grupos',
]

const skillsToEvaluateOptions = [
    'Creatividad',
    'Pensamiento Crítico',
    'Resolución de Problemas',
    'Comunicación',
    'Colaboración',
    'Liderazgo',
]

const ActivityAIFormProject = ({ lesson, age, markdown, setMarkdown }: Props) => {

    const [selectedDifficulty, setSelectedDifficulty] = useState('Media')
    const [selectedProjectType, setSelectedProjectType] = useState('Individual')
    const [selectedSkillsToEvaluate, setSelectedSkillsToEvaluate] = useState(['Creatividad'])
    const [toolsAndResources, setToolsAndResources] = useState('')
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
            category: 'proyecto',
            topic: lesson.subject,
            age: age,
            lesson: lesson.content,
            setMarkdown,
            difficulty: selectedDifficulty,
            projectType: selectedProjectType,
            skillsToEvaluate: selectedSkillsToEvaluate,
            toolsAndResources,
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
        <h2 className="text-center mb-8 text-2xl font-bold">Nuevo Projecto</h2>
        <div className="flex justify-center items-start gap-4 mb-6">
            <SelectorNew 
                value={selectedProjectType}
                setValue={setSelectedProjectType}
                options={projectTypeOptions}
                label="Tipo de Proyecto"
            />
            <MultiSelectorNew 
                value={selectedSkillsToEvaluate}
                setValue={setSelectedSkillsToEvaluate}
                options={skillsToEvaluateOptions}
                label="Tipo de Preguntas"
            />
        </div>
        <div className="w-full grid grid-cols-3 gap-10">

            <div>
                <DifficultySelector 
                    value={selectedDifficulty}
                    setValue={setSelectedDifficulty}
                    options={['Fácil', 'Media', 'Díficil']}
                    label="Dificultad"
                />
            </div>
            <div className="col-span-2">
                <ContextInput 
                    value={toolsAndResources}
                    setValue={setToolsAndResources}
                    label='Herramientas y recursos'
                    placeholder='Escribe aquí las herramientas y recursos que se pueden utilizar para el proyecto ...'
                />
            </div>
        </div>
        <AIButton 
            label="Generar Proyecto"
            onClick={() => console.log('Generar Tarea')}
        />
    </form>
    }
    </>
  )
}

export default ActivityAIFormProject