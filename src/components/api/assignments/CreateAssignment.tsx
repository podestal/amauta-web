import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Selector from "../../ui/Selector";
import { Assignment, categories } from "../../../data/mockdataForGrades";
import TextArea from "../../ui/TextArea";
import Calendar from "../../ui/Calendar";
import useNotificationsStore from "../../../hooks/store/useNotificationsStore";

interface Props {
  setLocalAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  assignatureId: number;
}

const CreateAssignment = ({ setLocalAssignments, assignatureId }: Props) => {

  const { setMessage, setShow, setType } = useNotificationsStore()
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDueDate = dueDate && new Date(dueDate);

    console.log('title', title)
    console.log('description', description)
    console.log('selectedCategory', selectedCategory)
    
    

    if (!title) {
      setTitleError('El título es requerido');
      return;
    }

    if (!selectedCategory) {
      setCategoryError('La categoría es requerida');
      return;
    }

    if (!description) {
      setDescriptionError('La descripción es requerida');
      return;
    }

    setLocalAssignments(prev => [{
      id: prev.length + 1,
      name: title,
      description,
      dueDate: newDueDate ? newDueDate.toISOString() : new Date().toISOString(),
      assignatureId,
      categoryId: parseInt(selectedCategory)
    }, ...prev])
    setOpen(false);
    setShow(true)
    setType('success')
    setMessage('Tarea creada exitosamente!')
  } 

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
            className="flex flex-col justify-start items-center gap-6 pb-20 w-full lg:w-[65%] mx-auto py-10">


            <div className="w-[60%] lg:w-full">
                <Input 
                  placeholder="Título" 
                  value={title}
                  onChange={(e) => {
                    title && setTitleError('')
                    setTitle(e.target.value)}}
                  error={titleError}
                />
            </div>
            <Selector 
              values={categories} 
              label="Categoría" 
              setter={setSelectedCategory}
              lan="ES" 
              error={categoryError}
              setError={setCategoryError}
            />

            {/* Fecha de Entrega */}
            <div className="w-[60%] lg:w-full">
                <p className="text-lg lg:text-xl dark:text-slate-50 text-center mb-6">Fecha de Entrega</p>
                <Calendar selectedDate={dueDate} setSelectedDate={setDueDate} />
            </div>


            <TextArea
               placeholder="Descripción" 
                value={description}
                onChange={(e) => {
                  description && setDescriptionError('')
                  setDescription(e.target.value)}}
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
