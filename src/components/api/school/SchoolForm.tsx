import React, { useState } from "react";
import { motion } from "framer-motion";
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Input from "../../ui/Input";

export interface School {
  name: string;
  type_of_institution: string;
  payment_status: string;
  automatic_late: string;
}

interface Props {
  school: School;
  onSave: (updated: School) => void;
}

const SchoolForm: React.FC<Props> = ({ school, onSave }) => {

  const [form, setForm] = useState<School>(school);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (value: string | null) => {
    setForm(prev => ({ ...prev, automatic_late: value || "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('new school', form);
    
    onSave(form);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-xl mx-auto p-6 bg-slate-200 dark:bg-slate-900 shadow-xl rounded-2xl"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-slate-50">Información del colegio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-50 mb-2">Nombre</label>
          <Input 
            value={form.name}
            placeholder="Nombre de la institución"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-50 mb-2">Tipo de institución</label>
          <Input 
            value={form.type_of_institution}
            placeholder="Tipo de institución"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-50">Estado de pago</label>
          <p>{form.payment_status}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-50">Hora de tardanza automática</label>
          <div className="mt-1">
            {/* <TimePicker
              onChange={handleTimeChange}
              value={form.automatic_late}
              disableClock
              className="w-full"
              format="HH:mm"
              clearIcon={null}
            /> */}
            <TimePicker 
                onChange={handleTimeChange}
                value={form.automatic_late}
                disableClock
                className="w-full bg-slate-950"
                format="HH:mm"
                clearIcon={null}
                amPmAriaLabel="Select AM/PM"
                clockAriaLabel="Toggle clock"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
        >
          Guardar cambios
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SchoolForm;
