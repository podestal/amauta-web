import { useRef, useState } from "react";
// import useNotificationsStore from "../../../hooks/store/useNotificationsStore";
import Input from "../../ui/Input";
import Calendar from "../../ui/Calendar";
// import { capacities } from "../../../data/mockdataForGrades";
import { motion } from "framer-motion";
import TextArea from "../../ui/TextArea";
import Button from "../../ui/Button";
import CategorySelector from "../category/CategorySelector";
import { UseMutationResult } from "@tanstack/react-query";
import { CreateActivityData } from "../../../hooks/api/activity/useCreateActivity";
import { Activity } from "../../../services/api/activityService";
import useAuthStore from "../../../hooks/store/useAuthStore";
import useNotificationsStore from "../../../hooks/store/useNotificationsStore";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpenText } from "lucide-react";
import getTitleCase from "../../../utils/getTitleCase";
import getCurrentQuarter from "../../../utils/getCurrentCuarter";
import MDEditor from "@uiw/react-md-editor";

interface Props {
    area: number;
    assignatureId: string;
    activity?: Activity;
    createActivity?: UseMutationResult<Activity, Error, CreateActivityData>
    updateActivity?: UseMutationResult<Activity, Error, CreateActivityData>
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    descriptionAI?: string
    categoryAI?: string
    titleAI?: string
    lesson?: number[]
    setAIPromptOpen?: React.Dispatch<React.SetStateAction<boolean>>
    setMarkdown?: React.Dispatch<React.SetStateAction<string>>
}

const ActivityForm = ({ assignatureId, activity, createActivity, updateActivity, setOpen, descriptionAI, categoryAI, titleAI, lesson, setAIPromptOpen, setMarkdown }: Props) => {

    const { setMessage, setShow, setType } = useNotificationsStore();
    const access =useAuthStore(state => state.access) || '';
    const [title, setTitle] = useState(activity ? activity.title : titleAI ? getTitleCase(titleAI) : "");
    const [description, setDescription] = useState(activity ? activity.description : "");
    const [selectedCategory, setSelectedCategory] = useState( activity ? activity.category.toString() : "0");
    // const [removedCompetency, setRemovedCompetency] = useState(0);
    const [dueDate, setDueDate] = useState<Date | undefined>(
      activity ? new Date(activity.due_date + "T00:00:00") : undefined
  )

    // const [selectedCompetencies, setSelectedCompetencies] = useState<number[]>(activity ? activity.competences : []);
    // const [selectedCapacities, setSelectedCapacities] = useState<number[]>(activity ? activity.capacities : []);
  
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [categoryError, setCategoryError] = useState("");  

    // REFS
    const titleRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);

    const [loading, setLoading] = useState(false);

    const scrollToField = (ref: React.RefObject<HTMLElement>) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        ref.current.focus();
      }
    };

    // useEffect(() => {
    //   if (selectedCompetencies.length === 0) {
    //     setSelectedCapacities([]);
    //   }
    //   if (!selectedCompetencies.includes(removedCompetency)) {
    //     const capacitiesToExclude = capacities.filter( capacity => (capacity.competence === removedCompetency)).map(capacity => capacity.id)
    //     const filteredCapacities = selectedCapacities.filter( capacity => !capacitiesToExclude.includes(capacity))
    //     setSelectedCapacities(filteredCapacities);
    //   }
    // }, [selectedCompetencies])

    const handleCreateActivity = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        let firstErrorField: React.RefObject<HTMLElement> | null = null
        

        if (!title) {
            setTitleError("El título es requerido");
            if (!firstErrorField) firstErrorField = titleRef;
            scrollToField(firstErrorField);
            return;
        }
        
        if (selectedCategory === '0') {
            setCategoryError("La categoría es requerida");
            if (!firstErrorField) firstErrorField = categoryRef;
            scrollToField(firstErrorField);
            return;
        }

        

        // if (!dueDate) {
        //     setDueDateError("La fecha de entrega es requerida");
        //     return;
        // }

        // if (selectedCompetencies.length === 0) {
        //     setMessage("Selecciona al menos una competencia");
        //     setType("error");
        //     setShow(true);
        //     return;
        // }

        // if (selectedCapacities.length === 0) {
        //     setMessage("Selecciona al menos una capacidad");
        //     setType("error");
        //     setShow(true);
        //     return;
        // }

        if (!lesson && descriptionAI) {
            setMessage("Selecciona al menos una lección");
            setType("error");
            setShow(true);
            return;
        }

        setLoading(true);
        

        createActivity && createActivity.mutate({
            access,
            activity: {
                title: title,
                description: descriptionAI ? descriptionAI : description,
                category: parseInt(selectedCategory),
                due_date: moment(dueDate).format('YYYY-MM-DD'),
                quarter: getCurrentQuarter(),
                assignature: parseInt(assignatureId),
                lessons: lesson  
            },
        }, {
            onSuccess: () => {
                setMessage("Actividad creada");
                setType("success");
                setShow(true);
                setOpen && setOpen(false);
                setAIPromptOpen && setAIPromptOpen(false);
                setMarkdown && setMarkdown("");
            },
            onError: () => {
                setMessage("Error al crear la tarea");
                setType("error");
                setShow(true);
            },
            onSettled: () => setLoading(false),
        });
        
        updateActivity && updateActivity.mutate({
            access,
            activity: {
                title: title,
                description: description,
                category: parseInt(selectedCategory),
                due_date: moment(dueDate).format('YYYY-MM-DD'),
                quarter: getCurrentQuarter(),
                assignature: parseInt(assignatureId),
            },
        }, {
            onSuccess: () => {
                setMessage("Tarea actualizada");
                setType("success");
                setShow(true);
                setOpen && setOpen(false);
            }
        })
    }

  //   // Toggle Competency Selection
  // const toggleCompetency = (id: number) => {
  //   setSelectedCompetencies((prev) =>
  //     prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
  //   );
  // };

  // // Toggle Capacity Selection
  // const toggleCapacity = (id: number) => {
  //   setSelectedCapacities((prev) =>
  //     prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
  //   );
  // };

  return (
    <motion.div
        className="w-full max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
    >
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">
        📝 {activity ? 'Modificar Actividad' : 'Crear Nueva Actividad'}
        </h1>
        <form 
            onSubmit={handleCreateActivity}
            className="flex flex-col justify-start items-center gap-6 pb-20 w-full lg:w-[65%] mx-auto py-10">
            <Input
                placeholder='Título'
                value={title}
                onChange={(e) => {
                  setTitleError("");
                  setTitle(e.target.value);
                }}
                error={titleError}
                ref={titleRef}
              />

            {/* Category Selector */}
            <CategorySelector 
                setSelectedCategory={setSelectedCategory}
                categoryError={categoryError}
                setCategoryError={setCategoryError}
                categoryRef={categoryRef}
                selectedCategory={selectedCategory}
                categoryAi={categoryAI}
            />

            {/* Due Date */}
            <p className="text-lg lg:text-xl dark:text-slate-50 text-center mb-6">
                Fecha de Entrega
              </p>
            <Calendar selectedDate={dueDate} setSelectedDate={setDueDate} />

            {/* <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                📌 Competencias
              </h3>
              <div className="flex flex-wrap gap-2">
                {competencies
                  .filter((competency) => competency.area === area)
                  .map((competency) => (
                  <motion.button
                    key={competency.id}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setRemovedCompetency(competency.id)
                      toggleCompetency(competency.id)}}
                    className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                      selectedCompetencies.includes(competency.id)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-blue-400 hover:text-white"
                    }`}
                  >
                    {competency.title}
                  </motion.button>
                ))}
              </div>
            </div> */}

            {/* Capacity Selector with Smooth Transitions */}
            {/* <AnimatePresence>
              {selectedCompetencies.length > 0 &&
                selectedCompetencies.map((competency) => (
                  <motion.div
                    key={competency}
                    className="w-full my-8"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">
                      🎯 Capacidades para {competency && competencies.find((c) => c.id === competency)?.title}
                    </h3>

                    <AnimatePresence>
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {capacities
                          .filter((capacity) => capacity.competence === competency)
                          .map((capacity) => (
                            <motion.button
                              key={capacity.id}
                              type="button"
                              onClick={() => toggleCapacity(capacity.id)}
                              className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                                selectedCapacities.includes(capacity.id)
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-700 text-gray-300 hover:bg-green-400 hover:text-white"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                            >
                              {capacity.title}
                            </motion.button>
                          ))}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                ))}
            </AnimatePresence> */}
            
            {descriptionAI 
            ? 
            <div className="p-6 bg-slate-800 rounded-3xl">
              <h2 className="text-xl text-center mb-4">{descriptionAI ? 'Contenido' : 'Descripción'}</h2>
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
                  {descriptionAI}
              </ReactMarkdown>
            </div>
            : 
            <>
            {activity && activity?.lessons.length > 0 
            ? 
            <MDEditor
                value={description}
                onChange={e => setDescription(e || "")}
                height={600}
                preview="edit"
            /> 
            : 
            <TextArea
              placeholder="Descripción"
              value={description}
              onChange={(e) => {
                setDescriptionError("");
                setDescription(e.target.value);
              }}
              error={descriptionError}
              tall
            /> 
            }
            </>
            }
            {/* Submit Button */}
            <div className="sm:col-span-2 flex justify-center">
              <Button loading={loading} label="✅ Crear Tarea" />
            </div>
        </form>
    </motion.div>
  )
}

export default ActivityForm