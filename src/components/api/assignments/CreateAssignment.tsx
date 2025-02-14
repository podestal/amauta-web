import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Selector from "../../ui/Selector";
import TextArea from "../../ui/TextArea";
import Calendar from "../../ui/Calendar";
import useNotificationsStore from "../../../hooks/store/useNotificationsStore";
import { Assignment, categories, competencies, capacities } from "../../../data/mockdataForGrades";

interface Props {
  setLocalAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  assignatureId: number;
  area: number;
}

const CreateAssignment = ({ setLocalAssignments, assignatureId, area }: Props) => {
  const { setMessage, setShow, setType } = useNotificationsStore();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  
  const [selectedCompetencies, setSelectedCompetencies] = useState<number[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>([]);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return setTitleError("El título es requerido");
    if (!selectedCategory) return setCategoryError("La categoría es requerida");
    if (!description) return setDescriptionError("La descripción es requerida");

    setLocalAssignments((prev) => [
      {
        id: prev.length + 1,
        name: title,
        description,
        dueDate: dueDate ? dueDate.toISOString() : new Date().toISOString(),
        assignatureId,
        categoryId: parseInt(selectedCategory),
        competencies: selectedCompetencies,
        capacities: selectedCapacities
      },
      ...prev,
    ]);

    setOpen(false);
    setShow(true);
    setType("success");
    setMessage("Tarea creada exitosamente!");
  };

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
    <>
      <Button label="➕ Nueva Tarea" onClick={() => setOpen(true)} />

      <Modal isOpen={open} onClose={() => setOpen(false)} whole>
        <motion.div
          className="w-full max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">
            📝 Crear Nueva Tarea
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-start items-center gap-6 pb-20 w-full lg:w-[65%] mx-auto py-10"
          >
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
            <Selector
              values={categories}
              label="Categoría"
              setter={setSelectedCategory}
              lan="ES"
              error={categoryError}
              setError={setCategoryError}
            />

            {/* Due Date */}
            <p className="text-lg lg:text-xl dark:text-slate-50 text-center mb-6">
                Fecha de Entrega
              </p>
            <Calendar selectedDate={dueDate} setSelectedDate={setDueDate} />

            {/* Competency Selector */}
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
      </Modal>
    </>
  );
};

export default CreateAssignment;


// import { useState } from "react";
// import { motion } from "framer-motion";
// import Button from "../../ui/Button";
// import Modal from "../../ui/Modal";
// import Input from "../../ui/Input";
// import Selector from "../../ui/Selector";
// import { Assignment, categories } from "../../../data/mockdataForGrades";
// import TextArea from "../../ui/TextArea";
// import Calendar from "../../ui/Calendar";
// import useNotificationsStore from "../../../hooks/store/useNotificationsStore";

// interface Props {
//   setLocalAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
//   assignatureId: number;
// }

// const CreateAssignment = ({ setLocalAssignments, assignatureId }: Props) => {

//   const { setMessage, setShow, setType } = useNotificationsStore()
//   const [open, setOpen] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [dueDate, setDueDate] = useState<Date | undefined>(new Date());

//   const [titleError, setTitleError] = useState('');
//   const [descriptionError, setDescriptionError] = useState('');
//   const [categoryError, setCategoryError] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newDueDate = dueDate && new Date(dueDate);

//     console.log('title', title)
//     console.log('description', description)
//     console.log('selectedCategory', selectedCategory)
    
    

//     if (!title) {
//       setTitleError('El título es requerido');
//       return;
//     }

//     if (!selectedCategory) {
//       setCategoryError('La categoría es requerida');
//       return;
//     }

//     if (!description) {
//       setDescriptionError('La descripción es requerida');
//       return;
//     }

//     setLocalAssignments(prev => [{
//       id: prev.length + 1,
//       name: title,
//       description,
//       dueDate: newDueDate ? newDueDate.toISOString() : new Date().toISOString(),
//       assignatureId,
//       competencies: [1],
//       capacities: [1],
//       categoryId: parseInt(selectedCategory)
//     }, ...prev])
//     setOpen(false);
//     setShow(true)
//     setType('success')
//     setMessage('Tarea creada exitosamente!')
//   } 

//   return (
//     <>
//       <Button label="➕ Nueva Tarea" onClick={() => setOpen(true)} />

//       <Modal isOpen={open} onClose={() => setOpen(false)} whole>
//         <motion.div
//           className="w-full max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.3 }}
//         >
//           {/* Header */}
//           <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">
//             📝 Crear Nueva Tarea
//           </h1>

//           {/* Form */}
//           <form 
//             onSubmit={handleSubmit}
//             className="flex flex-col justify-start items-center gap-6 pb-20 w-full lg:w-[65%] mx-auto py-10">


//             <div className="w-[60%] lg:w-full">
//                 <Input 
//                   placeholder="Título" 
//                   value={title}
//                   onChange={(e) => {
//                     title && setTitleError('')
//                     setTitle(e.target.value)}}
//                   error={titleError}
//                 />
//             </div>
//             <Selector 
//               values={categories} 
//               label="Categoría" 
//               setter={setSelectedCategory}
//               lan="ES" 
//               error={categoryError}
//               setError={setCategoryError}
//             />

//             {/* Fecha de Entrega */}
//             <div className="w-[60%] lg:w-full">
//                 <p className="text-lg lg:text-xl dark:text-slate-50 text-center mb-6">Fecha de Entrega</p>
//                 <Calendar selectedDate={dueDate} setSelectedDate={setDueDate} />
//             </div>


//             <TextArea
//                placeholder="Descripción" 
//                 value={description}
//                 onChange={(e) => {
//                   description && setDescriptionError('')
//                   setDescription(e.target.value)}}
//                 error={descriptionError}
//                tall
//             />

//             {/* Submit Button */}
//             <div className="sm:col-span-2 flex justify-center">
//               <Button label="✅ Crear Tarea" />
//             </div>
//           </form>
//         </motion.div>
//       </Modal>
//     </>
//   );
// };

// export default CreateAssignment;
