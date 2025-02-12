import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Selector from "../../ui/Selector";
import { categories } from "../../../data/mockdataForGrades";
import TextArea from "../../ui/TextArea";
import Calendar from "../../ui/Calendar";

const CreateAssignment = () => {
  const [open, setOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

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
          <form className="flex flex-col justify-start items-center gap-6 pb-20 w-full lg:w-[75%] mx-auto">


            <Input placeholder="Título" />
            <Selector values={categories} label="Categoría" setter={() => {}} lan="ES" />

            {/* Fecha de Entrega */}
            <div className="w-full">
                <p className="text-lg lg:text-xl dark:text-slate-50 text-center mb-6">Fecha de Entrega</p>
                <Calendar selectedDate={dueDate} setSelectedDate={setDueDate} />
            </div>


            <TextArea placeholder="Descripción" />

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
