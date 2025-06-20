import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import useGetClassroom from '../../../hooks/api/classroom/useGetClassroom';
import useSchoolStore from '../../../hooks/store/useSchoolStore';
import useAuthStore from '../../../hooks/store/useAuthStore';
import getClassroomDescription from '../../../utils/getClassroomDescription';
import AssignaturesAdminList from './AssignaturesAdminList';
import CreateAssignature from './CreateAssignature';

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
                <CreateAssignature 
                    classroomId={classroom.id}
                />
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
                        <AssignaturesAdminList 
                            classroomId={classroom.id}
                        />
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            ))}
        </div>
  );
};

export default ClassroomAssignaturesList;
