import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';
import useGetClassroom from '../../../hooks/api/classroom/useGetClassroom';
import useSchoolStore from '../../../hooks/store/useSchoolStore';
import useAuthStore from '../../../hooks/store/useAuthStore';
import getClassroomDescription from '../../../utils/getClassroomDescription';

const ClassroomAssignaturesList: React.FC = () => {
    const [expanded, setExpanded] = useState<number | null>(null);
    const school = useSchoolStore(s => s.school)
    const access = useAuthStore(s => s.access) || ''
    const { data: classrooms, isLoading, isError, error, isSuccess } = useGetClassroom({school: (school.id).toString(), access} )
    const toggleExpand = (id: number) => {
        setExpanded(prev => (prev === id ? null : id));
    };

    if (isLoading) return <p className='text-center animate-pulse text-xs my-4'>Cargando...</p>

    if (isError) return <p className='text-center text-red-500 text-xs my-4'>Error: {error.message}</p>

    if (isSuccess)

  return (
<div className="space-y-6">
        {/* <>{console.log('classroom', classrooms)}</> */}
            {classrooms.map(classroom => (
            <div key={classroom.id} className="bg-white dark:bg-gray-800 shadow-md rounded-xl">
                <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center gap-1">
                    <Plus size={16} /> <span className="hidden sm:inline">Agregar Curso</span>
                </button>
                <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-xl"
                onClick={() => toggleExpand(classroom.id)}
                >
                    
                <div className="text-lg font-medium">{getClassroomDescription({ lan: 'ES', grade: classroom.grade, level: classroom.level, section: classroom.section })}</div>
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
                    {/* {classroom.assignatures.length > 0 ? (
                        <ul className="list-disc list-inside">
                        {classroom.assignatures.map(a => (
                            <li key={a.id}>{a.title}</li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-sm italic text-gray-500 dark:text-gray-400">
                        Aún no hay cursos.
                        </p>
                    )} */}
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            ))}
        </div>
  );
};

export default ClassroomAssignaturesList;
