import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_KEY
const googleGenAI = new GoogleGenAI({
    apiKey: apiKey,})

interface GetPrompotsProps {
    category: string 
    topic: string 
    age: number 
    lesson: string
}
    
const getPrompt = ({ category, topic, age, lesson }: GetPrompotsProps) => {
    const prompts: Record<string, string> = {
        'tarea': `Basado en la siguiente lección, ${topic} genera una tarea para estudiantes de ${age} años que incluya entre 4 y 6 ejercicios prácticos. La tarea debe enfocarse en reforzar los conceptos clave de la lección como identificar partes de una expresión algebraica, traducir expresiones verbales, simplificar expresiones y evaluar expresiones algebraicas.

                Requisitos:

                    La tarea debe tener un breve enunciado inicial que explique el propósito del ejercicio.

                    Cada ejercicio debe ser claro y breve.

                    No incluir actividades largas ni proyectos.

                    Evita lenguaje técnico complejo.

                    Asegúrate de que los ejercicios estén alineados con el contenido de la lección y adecuados al nivel de un estudiante de secundaria.

                Lección:
                ${lesson}`,
        'ejercicios': `Basado en la siguiente lección, ${topic} genera una actividad con entre 5 y 7 ejercicios breves que los alumnos puedan resolver durante la clase, tipo cuestionario.

                    Requisitos:

                        Enfocados en aplicar lo aprendido.

                        Cada ejercicio debe ser claro, breve y directo.

                        Usar variedad de formatos: opción múltiple, completar, resolver.

                        Nivel: estudiantes de ${age} años.

                        No incluir explicaciones ni interacciones.

                        No saludar ni dar instrucciones adicionales.

                    Lección:
                    ${lesson}`
    }

    console.log(prompts[category]);
    return prompts[category]
    
}

interface AIResponseProps {
    category: string,
    topic: string, 
    age: number, 
    lesson: string,
    setMarkdown: React.Dispatch<React.SetStateAction<string>> 
}

const getAIResponse = async ({ 
    category, 
    topic, 
    age, 
    lesson, 
    setMarkdown
 }: AIResponseProps ) => {

        const prompt = getPrompt({ category, topic, age, lesson })
        const response = await googleGenAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        })
        console.log('AI response', response.candidates?.[0]?.content?.parts?.[0]?.text || 'No content available');
        setMarkdown(response.candidates?.[0]?.content?.parts?.[0]?.text || '')
  }


  export default getAIResponse