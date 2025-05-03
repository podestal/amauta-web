import { useState } from "react"
import Modal from "../../ui/Modal"
import LessonForm from "./LessonForm"
import { GoogleGenAI } from "@google/genai"
import useCreateLesson from "../../../hooks/api/lesson/useCreateLesson"

interface Props {
    classroom: string
    assignature: string
    quarter: string
}

const CreateLesson = ({ classroom, assignature, quarter }: Props) => {

    const [open, setOpen] = useState(false)
    const createLesson = useCreateLesson({ assignatureId: assignature, quarter })

    const apiKey = import.meta.env.VITE_GEMINI_KEY
      const googleGenAI = new GoogleGenAI({
        apiKey: apiKey,})
        
      const getAIResponse = async (
        topic: string, 
        age: number,
        methodology: string,
        setMarkdown: React.Dispatch<React.SetStateAction<string>> ) => {
        const response = await googleGenAI.models.generateContent({
          model: 'gemini-2.0-flash',
          // contents: `Eres un experto en pedagogía y planificación de clases. Genera una lección completa y bien estructurada pensada para docentes. La lección debe estar escrita en español, tener formato claro y estar adaptada a:
    
          //             Edad de los alumnos: ${age} años
    
          //             Metodología deseada: ${methodology}
    
          //             Contexto adicional del docente: []
    
          //             Tema de la lección: ${topic}
    
          //             La estructura debe seguir este formato:
    
          //             Objetivos de la Lección
    
          //             Lista de 3 a 5 objetivos claros y medibles.
    
          //             Introducción (10 - 15 minutos)
          //             Actividades como: revisión de conocimientos previos, situaciones problema, contextualización, introducción al tema.
    
          //             Desarrollo (25 - 30 minutos)
    
          //                 Teoría sobre el tema (1.1, 1.2...)
    
          //                 Actividad práctica (si aplica la metodología)
    
          //             Discusión y Conclusión (5 - 10 minutos)
          //             Actividades de reflexión, socialización, cierre.
    
          //             Retorno (10 - 15 minutos)
          //             Ronda de preguntas, evaluación, retroalimentación del profesor.
    
          //             Conclusión Final (5 - 10 minutos)
          //             Resumen, conexión teoría-práctica, materiales extra, relevancia del tema.
                      
          //             Also this is quite important do not say here you go, do not interact with me in any way shape of form, just send what I asked for, also include bibliography at the end of the lesson, and do not include any other information, just the lesson, and do not say anything else, just the lesson.`,
          contents: `Eres un experto en pedagogía y planificación de clases. Genera una lección completa y bien estructurada pensada para docentes de nivel escolar. La lección debe estar escrita en español, tener formato claro, profundidad académica y estar adaptada a:
                      Edad de los alumnos: ${age} años  
                      Metodología deseada: ${methodology}  
                      Tema de la lección: ${topic}  
                      ---
                      La estructura de la lección debe seguir este formato:
                      **Objetivos de la Lección**  
                      - Lista de 3 a 5 objetivos claros, específicos y medibles.
                      **Introducción (10 - 15 minutos)**  
                      - Actividades como revisión de conocimientos previos, situaciones problema, contextualización, introducción al tema.
                      **Desarrollo (25 - 30 minutos)**  
                      1. Teoría bien explicada, organizada por subtemas numerados (1.1, 1.2, etc.).  
                      2. Actividades prácticas significativas y alineadas con la metodología y contenido.
                      **Discusión y Conclusión (5 - 10 minutos)**  
                      - Actividades de reflexión, socialización de ideas, y cierre del contenido visto.
                      **Retorno (10 - 15 minutos)**  
                      - Preguntas dirigidas, evaluación formativa y retroalimentación del docente.
                      **Conclusión Final (5 - 10 minutos)**  
                      - Resumen de aprendizajes, conexión teoría-práctica, sugerencias de materiales extra, y reflexión sobre la relevancia del tema.
                      **Bibliografía**  
                      - Lista de al menos 3 referencias académicas o libros educativos válidos.
                      ⚠️ No respondas con saludos, explicaciones, ni introducciones. Solo proporciona el contenido de la lección con el formato especificado.
`
        })
        console.log('AI response', response.candidates?.[0]?.content?.parts?.[0]?.text || 'No content available');
        setMarkdown(response.candidates?.[0]?.content?.parts?.[0]?.text || '')
      }


  return (
    <>
        <button 
            onClick={() => setOpen(true)}
            className="relative inline-flex items-center justify-center px-[1px] py-[1px] rounded-lg bg-transparent dark:text-white font-semibold overflow-hidden">
        <span className="absolute inset-0 rounded-lg p-[1px] bg-[conic-gradient(from_0deg,red,orange,yellow,green,blue,indigo,violet,red)] animate-pulse hover:text-slate-200 z-0"></span>
        <span className="relative z-10 dark:bg-slate-950 bg-slate-50 hover:opacity-90 transition-opacity rounded-lg px-6 py-2">
            Nueva Lección
        </span>
        </button>
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            whole
        >
            <LessonForm 
                classroom={classroom}
                getAIResponse={getAIResponse}
                createLesson={createLesson}
                assignature={assignature}
            />
        </Modal>
    </>
  )
}

export default CreateLesson