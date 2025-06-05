import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';

interface Assignature {
  id: number;
  title: string;
}

interface Classroom {
  id: number;
  name: string;
  assignatures: Assignature[];
}

const mockClassrooms: Classroom[] = [
  {
    id: 1,
    name: '1st Grade A',
    assignatures: [
      { id: 1, title: 'Mathematics' },
      { id: 2, title: 'Science' },
    ],
  },
  {
    id: 2,
    name: '2nd Grade B',
    assignatures: [
      { id: 3, title: 'Language' },
    ],
  },
  {
    id: 3,
    name: '3rd Grade C',
    assignatures: [],
  },
];

const ClassroomAssignaturesList: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);


  const toggleExpand = (id: number) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto px-4 py-6 text-gray-800 dark:text-gray-100">
        <h2 className="text-2xl font-bold mb-4">Clases</h2>
        <div className="space-y-6">
            {mockClassrooms.map(classroom => (
            <div key={classroom.id} className="bg-white dark:bg-gray-800 shadow-md rounded-xl">
                <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center gap-1">
                    <Plus size={16} /> <span className="hidden sm:inline">Agregar Curso</span>
                </button>
                <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-xl"
                onClick={() => toggleExpand(classroom.id)}
                >
                    
                <div className="text-lg font-medium">{classroom.name}</div>
                <div className="flex items-center space-x-3">
                    <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${expanded === classroom.id ? 'rotate-180' : ''}`}
                    />
                </div>
                </div>
                <AnimatePresence initial={false}>
                {expanded === classroom.id && (
                    <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 py-2 overflow-hidden border-t border-gray-200 dark:border-gray-700"
                    >
                    {classroom.assignatures.length > 0 ? (
                        <ul className="list-disc list-inside">
                        {classroom.assignatures.map(a => (
                            <li key={a.id}>{a.title}</li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-sm italic text-gray-500 dark:text-gray-400">
                        Aún no hay cursos.
                        </p>
                    )}
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            ))}
        </div>
    </motion.div>
  );
};

export default ClassroomAssignaturesList;
