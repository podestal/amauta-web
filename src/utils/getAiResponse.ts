import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_KEY
const googleGenAI = new GoogleGenAI({
    apiKey: apiKey,})

interface GetPromptHomeworkProps {
    topic: string 
    age: number 
    lesson: string
    homeworkType: string
    numberOfQuestions: number
    difficulty: string
    context: string
}
    
const getPromptHomework = ({ topic, age, lesson, homeworkType, numberOfQuestions, difficulty, context }: GetPromptHomeworkProps) => {
    return `Genera una tarea a partir de la siguiente lección, el tema es ${topic} dirigida a estudiantes de ${age} años. La tarea debe tener entre ${numberOfQuestions} ejercicios prácticos, con un nivel de dificultad ${difficulty}.

                Tipo de tarea: ${homeworkType}  
                Contexto de la lección: ${context}  

                🔹 Requisitos:
                - La tarea debe comenzar con un enunciado breve que explique el propósito general del ejercicio.
                - Cada ejercicio debe ser claro, breve y estar alineado con el contenido de la lección.
                - Enfocada en reforzar conceptos clave como identificar partes de una expresión algebraica, traducir expresiones verbales, simplificar y evaluar expresiones algebraicas.
                - Evita actividades largas, explicaciones extensas o proyectos.
                - No usar lenguaje técnico complejo ni instrucciones innecesarias.
                - No incluir saludos ni ningún tipo de interacción con el usuario.

                📚 Lección:
            ${lesson}`
}

interface GetPromptClassWorkProps {
    topic: string
    age: number
    lesson: string
    typeOfActivity: string
    durationOfActivity: number
    levelOfInteraction: string
}

const getPromptClassWork = ({ topic, age, lesson, typeOfActivity, durationOfActivity, levelOfInteraction}: GetPromptClassWorkProps ) => {
    return `
    Genera una actividad de clase sobre el tema "${topic}", basada en la siguiente lección, dirigida a estudiantes de ${age} años.

    🔸 Tipo de actividad: ${typeOfActivity}  
    🔸 Duración estimada: ${durationOfActivity} minutos  
    🔸 Nivel de interacción esperado: ${levelOfInteraction}  

    📋 Requisitos:
    - La actividad debe tener entre 5 y 7 ejercicios que se puedan realizar durante el tiempo asignado.
    - Cada ejercicio debe ser claro, breve y diseñado para aplicar conceptos clave de la lección.
    - Puede incluir diferentes formatos como opción múltiple, verdadero/falso, completar o ejercicios breves de resolución.
    - El nivel de dificultad debe ser apropiado para la edad indicada.
    - Evitar explicaciones largas, instrucciones extensas o contenido que no sea parte de la actividad.
    - No incluir saludos, mensajes introductorios ni interacción con el usuario. Solo entregar el contenido solicitado.

    📚 Lección:
    ${lesson}`
}

interface GetPromptTestProps {
    topic: string
    age: number
    lesson: string
    typeOfQuestions: string[]
    numberOfQuestions: number
    skillsToEvaluate: string[]
    difficulty: string
}

const getPromptTest = ({ topic, age, lesson, typeOfQuestions, numberOfQuestions, skillsToEvaluate, difficulty }: GetPromptTestProps) => {
    return `
    Genera una prueba sobre el tema "${topic}", basada en la siguiente lección, dirigida a estudiantes de ${age} años.

    📝 Especificaciones:
    - Tipo de preguntas: ${typeOfQuestions}
    - Número de preguntas: ${numberOfQuestions}
    - Habilidades a evaluar: ${skillsToEvaluate}
    - Dificultad: ${difficulty}

    📋 Requisitos:
    - La prueba debe consistir únicamente en las preguntas, sin introducciones ni saludos.
    - Cada pregunta debe ser clara, precisa y alineada con los contenidos y objetivos de la lección.
    - Utiliza el tipo de preguntas especificado, manteniendo coherencia y variedad si corresponde.
    - Asegúrate de que el nivel de dificultad corresponda al indicado y a la edad del estudiante.
    - No incluir instrucciones adicionales, explicaciones ni comentarios. Solo mostrar las preguntas generadas.

    📚 Lección:
    ${lesson}`
}

interface GetPromptProjectProps {
    topic: string
    age: number
    lesson: string
    projectType: string
    difficulty: string
    skillsToEvaluate: string[]
    toolsAndResources: string
}

const getPromptProject = ({ topic, age, lesson, projectType, difficulty, skillsToEvaluate, toolsAndResources }: GetPromptProjectProps) => {
    return `
    Diseña un proyecto escolar sobre el tema "${topic}" para estudiantes de ${age} años, basado en la siguiente lección.

    🛠️ Especificaciones:
    - Tipo de proyecto: ${projectType}
    - Dificultad: ${difficulty}
    - Habilidades a evaluar o integrar: ${skillsToEvaluate}
    - Herramientas o recursos que pueden ser utilizados: ${toolsAndResources}

    📋 Requisitos:
    - El proyecto debe estar enfocado en el aprendizaje profundo, la creatividad y el trabajo colaborativo si es posible.
    - Incluir una descripción breve del proyecto, las fases sugeridas (planeación, desarrollo, presentación) y una entrega esperada (informe, prototipo, etc.).
    - Asegúrate de que el proyecto esté alineado con los contenidos de la lección y que los recursos mencionados sean apropiados.
    - No incluir saludos, instrucciones adicionales ni interacción. Solo describir el proyecto con claridad.

    📚 Lección:
${lesson}`
}

interface AIResponseProps {
    category: string,
    topic: string, 
    age: number, 
    lesson: string,
    setMarkdown: React.Dispatch<React.SetStateAction<string>> 
    homeworkType?: string
    numberOfQuestions?: number
    difficulty?: string
    context?: string
    typeOfActivity?: string
    durationOfActivity?: number
    levelOfInteraction?: string
    typeOfQuestions?: string[]
    skillsToEvaluate?: string[]
    projectType?: string
    toolsAndResources?: string
}

const getAIResponse = async ({ 
    category, 
    topic, 
    age, 
    lesson, 
    setMarkdown,
    homeworkType,
    numberOfQuestions,
    difficulty,
    context='',
    typeOfActivity,
    durationOfActivity,
    levelOfInteraction,
    typeOfQuestions,
    skillsToEvaluate,
    projectType,
    toolsAndResources

 }: AIResponseProps ) => {

        // let prompt = getPrompt({ category, topic, age, lesson, homeworkType, numberOfQuestions, difficulty, context })
        let prompt = ''
        if (category === 'tarea') {
            prompt = (homeworkType && numberOfQuestions && difficulty) ? getPromptHomework({ topic, age, lesson, homeworkType, numberOfQuestions, difficulty, context }) : ''
        } else if (category === 'trabajo en clase') {
            prompt = (typeOfActivity && durationOfActivity && levelOfInteraction) ? getPromptClassWork({ topic, age, lesson, typeOfActivity, durationOfActivity, levelOfInteraction }) : ''
        } else if (category === 'evaluación') {
            prompt = (numberOfQuestions && difficulty && typeOfQuestions && skillsToEvaluate) ? getPromptTest({ topic, age, lesson, typeOfQuestions, numberOfQuestions, skillsToEvaluate, difficulty }) : ''
        } else if (category === 'proyecto') {
            prompt = (projectType && difficulty && skillsToEvaluate && toolsAndResources) ? getPromptProject({ topic, age, lesson, projectType, difficulty, skillsToEvaluate, toolsAndResources }) : ''
        }
        const response = await googleGenAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        })
        console.log('AI response', response.candidates?.[0]?.content?.parts?.[0]?.text || 'No content available');
        setMarkdown(response.candidates?.[0]?.content?.parts?.[0]?.text || '')
  }


  export default getAIResponse