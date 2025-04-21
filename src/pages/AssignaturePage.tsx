import Activities from '../components/api/activity/Activities'
import { GoogleGenAI } from '@google/genai'
import { useEffect, useState } from 'react'
import Input from '../components/ui/Input'
import ReactMarkdown from 'react-markdown'
import { BookOpenText } from 'lucide-react'
import remarkGfm from 'remark-gfm'
import Modal from '../components/ui/Modal'
import MDEditor from "@uiw/react-md-editor";
import Button from '../components/ui/Button'
import CreateLesson from '../components/api/lesson/createLesson'
import { useLocation } from 'react-router-dom'
import useGetProfileStore from '../hooks/store/useGetProfileStore'
import getAgeFromClassroom from '../utils/getAgeFromClassroom'

interface LessonContentProps {
  markdown: string
  setMarkdown: React.Dispatch<React.SetStateAction<string>>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LessonContent = ({ markdown, setMarkdown, open, setOpen }: LessonContentProps) => {
  return ( 
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      whole
    >
      <div className="px-4 py-6 bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-lg mx-auto w-full">
        <div className='flex justify-center items-center mb-4'>
          <Button 
            label='Guardar'
          />
        </div>
        {/* <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ node, ...props }) => (
              <h2 className="mt-10 mb-4 text-2xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-300">
                <BookOpenText className="w-5 h-5 text-indigo-400" />
                <span {...props} />
              </h2>
            ),
            h3: ({ node, ...props }) => (
              <h3 className="mt-6 mb-2 text-xl font-semibold text-gray-800 dark:text-slate-100" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-slate-100" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700 dark:text-slate-100" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-base leading-relaxed" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-base text-gray-800 dark:text-slate-100 leading-relaxed mb-4" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-semibold text-indigo-700 dark:text-indigo-300" {...props} />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown> */}
        <MDEditor
          value={markdown}
          onChange={(value) => setMarkdown(value || "")}
          height={600}
        />
      </div>
    </Modal>
  )
}

const AssignaturePage = () => {

  const state = useLocation().state
  const profile = useGetProfileStore(s => s.profile)
  const classroom = profile?.clases_details?.find( classroom => classroom.split('-')[classroom.split('-').length - 1] === (state.classroom)?.toString()) || ''

  

  const [topic, setTopic] = useState('')
  const [topicError, setTopicError] = useState('')
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const apiKey = import.meta.env.VITE_GEMINI_KEY
  const googleGenAI = new GoogleGenAI({
    apiKey: apiKey,})
    
  const getAIResponse = async (topic: string) => {
    setLoading(true)
    const response = await googleGenAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Eres un experto en pedagogía y planificación de clases. Genera una lección completa y bien estructurada pensada para docentes. La lección debe estar escrita en español, tener formato claro y estar adaptada a:

                  Edad de los alumnos: [13] años

                  Metodología deseada: [clase magistral] (por ejemplo: clase magistral, clase activa, clase práctica)

                  Contexto adicional del docente: []

                  Tema de la lección: ${topic}

                  La estructura debe seguir este formato:

                  Objetivos de la Lección

                  Lista de 3 a 5 objetivos claros y medibles.

                  Introducción (10 - 15 minutos)
                  Actividades como: revisión de conocimientos previos, situaciones problema, contextualización, introducción al tema.

                  Desarrollo (25 - 30 minutos)

                      Teoría sobre el tema (1.1, 1.2...)

                      Actividad práctica (si aplica la metodología)

                  Discusión y Conclusión (5 - 10 minutos)
                  Actividades de reflexión, socialización, cierre.

                  Retorno (10 - 15 minutos)
                  Ronda de preguntas, evaluación, retroalimentación del profesor.

                  Conclusión Final (5 - 10 minutos)
                  Resumen, conexión teoría-práctica, materiales extra, relevancia del tema.
                  
                  Also this is quite important do not say here you go, do not interact with me in any way shape of form, just send what I asked for, also include bibliography at the end of the lesson, and do not include any other information, just the lesson, and do not say anything else, just the lesson.`,
    })
    setMarkdown(response.candidates?.[0]?.content?.parts?.[0]?.text || '')
    console.log('AI response', response.candidates?.[0]?.content?.parts?.[0]?.text || 'No content available');
  }

  useEffect(() => {
    if (markdown) {
      setLoading(false)
      setOpen(true)
    }
  }, [markdown])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('topic', topic);
    
    if (topic.trim() === '') {
      setTopicError('Please enter a topic')
      return
    }

    getAIResponse(topic)
    setTopic('')
  }
   

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden">
      {/* <form 
        onSubmit={handleSubmit}>
        <Input 
          value={topic}
          onChange={(e) => {
            topic && setTopicError('')
            setTopic(e.target.value)}}
          placeholder='Enter your prompt here...'
          error={topicError}
          setError={setTopicError}
        />
        <button className='bg-blue-600 text-slate-50 px-6 py-2'>Get AI Response</button>
      </form>
      {loading 
      ? 
      <div className='w-full flex justify-center items-center my-10'>
        <p className='text-md animate-pulse font-bold'>Un Momento</p>
      </div> 
      : 
      <LessonContent 
        markdown={markdown}
        setMarkdown={setMarkdown}
        open={open}
        setOpen={setOpen}
      />
      } */}
      <div className='w-full h-screen flex justify-center items-center'>
      <CreateLesson 
        classroom={classroom}
      />
      </div>
        {/* <Activities /> */}
    </div>
  )
}

export default AssignaturePage