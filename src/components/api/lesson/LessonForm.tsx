import { useState } from "react"
import Input from "../../ui/Input"
import Selector from "../../ui/Selector"
import TextArea from "../../ui/TextArea"
import getAgeFromClassroom from "../../../utils/getAgeFromClassroom"
import LessonContent from "./LessonContent"
import { UseMutationResult } from "@tanstack/react-query"
import { Lesson } from "../../../services/api/lessonService"
import { CreateLessonData } from "../../../hooks/api/lesson/useCreateLesson"

const methodologies = [
    { id: 'Clase magistral', name: 'Clase magistral' },
    { id: 'Clase activa', name: 'Clase activa' },
    { id: 'Clase práctica', name: 'Clase práctica' },

]

interface Props {
    classroom: string
    assignature: string
    getAIResponse?: (topic: string, age:number, methodology:string, setMarkdown: React.Dispatch<React.SetStateAction<string>>) => Promise<void>
    createLesson?:  UseMutationResult<Lesson, Error, CreateLessonData>
}

const LessonForm = ({ classroom, assignature, getAIResponse }: Props) => {
    
    const [topic, setTopic] = useState('')
    const [loading, setLoading] = useState(false)
    const [markdown, setMarkdown] = useState('')
    const [methodology, setMethodology] = useState('')
    const [startAIRequest, setStartAIRequest] = useState(false)
    const age = getAgeFromClassroom(classroom)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('age', age);
        
        setStartAIRequest(true)
        setLoading(true)
        if (!getAIResponse) return 
        try {
            await getAIResponse(topic, age, methodology, setMarkdown)
        } catch (error) {
            console.error('Error al crear la lección', error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <>
        {startAIRequest 
        ? 
        <LessonContent 
            markdown={markdown}
            setMarkdown={setMarkdown}
            loading={loading}
            setLoading={setLoading}
            assignature={assignature}
            classroom={classroom}
            topic={topic}
        /> 
        : 
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 h-full p-4 lg:w-[50%] mx-auto dark:bg-gray-900 bg-slate-200 rounded-2xl shadow-lg"
        >
            <h2 className="text-3xl font-bold text-white text-center">Preparar Clase</h2>
            <Input 
                placeholder='Tema'
                label="Tema"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <Selector 
                values={methodologies}
                defaultValue={methodology}
                setter={setMethodology}
                label="Metodología"    
                lan="es"
            />
            <TextArea 
                label="Contexto"
                placeholder="Escribe el contexto de la clase"
            />
            <button className="relative inline-flex items-center justify-center px-[1px] py-[1px] rounded-lg bg-transparent text-white  font-semibold overflow-hidden">
                <span className="absolute inset-0 rounded-lg p-[1px] bg-[conic-gradient(from_0deg,red,orange,yellow,green,blue,indigo,violet,red)] animate-pulse hover:text-slate-200 z-0"></span>
                <span className="relative z-10 bg-gray-900 hover:opacity-90 transition-opacity rounded-lg px-6 py-2">
                    Crear
                </span>
            </button>
        </form>}
        
    </>
  )
}

export default LessonForm