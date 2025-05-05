import MDEditor from "@uiw/react-md-editor"
import Button from "../../ui/Button"
import LoaderAI from "../../ui/LoaderAI"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { BookOpenText } from "lucide-react"
import useCreateLesson from "../../../hooks/api/lesson/useCreateLesson"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useGetProfileStore from "../../../hooks/store/useGetProfileStore"
import getCurrentQuarter from "../../../utils/getCurrentCuarter"

interface LessonContentProps {
    markdown: string
    setMarkdown: React.Dispatch<React.SetStateAction<string>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    assignature: string
    classroom: string
    topic: string
  }
  
  const LessonContent = ({ markdown, setMarkdown, loading, setLoading, assignature, classroom, topic }: LessonContentProps) => {

    const access = useAuthStore(s => s.access) || ''
    const quarter = getCurrentQuarter()
    const profile = useGetProfileStore(s => s.profile)
    const [update, setUpdate] = useState(true)
    const createLesson = useCreateLesson({ assignatureId: assignature, quarter})

    useEffect(() => {
        if (markdown) {
          setLoading(false)
        }
      }, [markdown])

      const handleCreateLesson = () => {
 
        if (!profile) return

        createLesson.mutate({
            access,
            lesson: {
                instructor: profile.id,
                assignature: parseInt(assignature),
                classroom: parseInt(classroom),
                subject: topic,
                content: markdown
            }
        }, {
            onSuccess: (res) => {
                console.log('Lección creada', res)
                setUpdate(false)
            },
            onError: (err) => {
                console.error('Error al crear la lección', err)
            }
        })
      }

    return ( 
        <>
        {loading 
        ? 
        <LoaderAI /> 
        :
        <div className="px-4 py-6 bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-lg mx-auto w-full">
            {update ? 
            <div className='flex justify-center items-center mb-4'>
                <Button 
                    label='Guardar'
                    onClick={handleCreateLesson}
                />
            </div> : 
            <div className='flex justify-center items-center mb-4'>
                <Button 
                    label='Editar'
                    onClick={() => setUpdate(true)}
                />
            </div>
        }
            {update 
            ? 
            <MDEditor
                value={markdown}
                onChange={(value) => setMarkdown(value || "")}
                height={600}
            /> 
            : 
            <ReactMarkdown
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
            </ReactMarkdown>
            }
            </div>}
        </>
    )
  }

  export default LessonContent