import { RiBook3Fill } from 'react-icons/ri'
import { StudentByAgendas } from '../../../../services/api/studentsService'
import Button from '../../../ui/Button'
import { useState } from 'react'
import Modal from '../../../ui/Modal'
import StudentAgendaContent from './StudentAgendaContent'

interface Props {
    student: StudentByAgendas
}

const StudentAgendaCard = ({ student }: Props) => {

    const [open, setOpen] = useState(false)
    

  return (
    <>
        <div className={`w-full border-l-8 ${student.filtered_read_agendas ? 'border-green-500' : 'border-red-500'} flex justify-between items-center bg-gray-800 text-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 `}>
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
        </div>
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <StudentAgendaContent 
                student={student}
                open={open}
            />
        </Modal>
    </>
  )
}

export default StudentAgendaCard
