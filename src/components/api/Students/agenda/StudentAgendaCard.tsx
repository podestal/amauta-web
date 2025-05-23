import { RiBook3Fill } from 'react-icons/ri'
import { StudentByAgendas } from '../../../../services/api/studentsService'
import Button from '../../../ui/Button'
import { useState } from 'react'
import Modal from '../../../ui/Modal'
import StudentAgendaContent from './StudentAgendaContent'
import { motion } from 'framer-motion'

interface Props {
    student: StudentByAgendas
    classroom: string
}

const StudentAgendaCard = ({ student, classroom }: Props) => {

    const [open, setOpen] = useState(false)
    const itemVariants = {
        hidden: { opacity: 0, x: 50 }, 
        visible: { opacity: 1, x: 0 }, 
    };
    

  return (
    <>
        <motion.div 
            variants={itemVariants}
            className={`w-full border-l-8 border-t-2 ${student.filtered_read_agendas || student.filtered_tutor_contact ? 'border-green-500' : 'border-amber-700'} flex justify-between items-center dark:bg-gray-800 bg-slate-200 dark:text-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 `}>
            <div className='flex justify-start items-center gap-6'>
                <RiBook3Fill 
                    onClick={() => setOpen(true)}
                    className='text-blue-600 cursor-pointer hover:text-blue-500 text-xl'
                />
                <h3 className="text-lg font-semibold">{student.first_name} {student.last_name}</h3>
            </div>
            {/* <p className="text-gray-400">📞 {student.tutor_phone}</p> */}
            <Button 
                label='Contactar'
                onClick={() => setOpen(true)}
            />
        </motion.div>
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <StudentAgendaContent 
                student={student}
                open={open}
                classroom={classroom}
                setOpen={setOpen}
            />
        </Modal>
    </>
  )
}

export default StudentAgendaCard
