import { useState } from "react";
import useNotificationsStore from "../../../hooks/store/useNotificationsStore";
import Input from "../../ui/Input";
import Calendar from "../../ui/Calendar";
import { capacities, competencies } from "../../../data/mockdataForGrades";
import { AnimatePresence, motion } from "framer-motion";
import TextArea from "../../ui/TextArea";
import Button from "../../ui/Button";
import CategorySelector from "../category/CategorySelector";

interface Props {
    area: number;
}

const ActivityForm = ({ area }: Props) => {

    // const { setMessage, setShow, setType } = useNotificationsStore();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [dueDate, setDueDate] = useState<Date | undefined>(new Date());

    const [selectedCompetencies, setSelectedCompetencies] = useState<number[]>([]);
    const [selectedCapacities, setSelectedCapacities] = useState<number[]>([]);
  
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [categoryError, setCategoryError] = useState("");

    // Toggle Competency Selection
  const toggleCompetency = (id: number) => {
    setSelectedCompetencies((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // Toggle Capacity Selection
  const toggleCapacity = (id: number) => {
    setSelectedCapacities((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
        className="w-full max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
    >
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">
        📝 Crear Nueva Tarea
        </h1>
        <form className="flex flex-col justify-start items-center gap-6 pb-20 w-full lg:w-[65%] mx-auto py-10">
            <Input
                placeholder="Título"
                value={title}
                onChange={(e) => {
                  setTitleError("");
                  setTitle(e.target.value);
                }}
                error={titleError}
              />

            {/* Category Selector */}
            <CategorySelector 
                setSelectedCategory={setSelectedCategory}
                categoryError={categoryError}
                setCategoryError={setCategoryError}
            />

            {/* Due Date */}
            <p className="text-lg lg:text-xl dark:text-slate-50 text-center mb-6">
                Fecha de Entrega
              </p>
            <Calendar selectedDate={dueDate} setSelectedDate={setDueDate} />

            <div className="w-full">
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
                    onClick={() => toggleCompetency(competency.id)}
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
            </div>

            {/* Capacity Selector with Smooth Transitions */}
            <AnimatePresence>
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
            </AnimatePresence>
            
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

            {/* Submit Button */}
            <div className="sm:col-span-2 flex justify-center">
              <Button label="✅ Crear Tarea" />
            </div>
        </form>
    </motion.div>
  )
}

export default ActivityForm