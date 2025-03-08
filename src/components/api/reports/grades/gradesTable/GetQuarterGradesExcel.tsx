import axios from 'axios'
import useGetProfileStore from '../../../../../hooks/store/useGetProfileStore'
import { Instructor } from '../../../../../services/api/instructorService'
import Button from '../../../../ui/Button'
import useAuthStore from '../../../../../hooks/store/useAuthStore'
import Modal from '../../../../ui/Modal'
import { useState } from 'react'
import Selector from '../../../../ui/Selector'
import getClassroomDescription from '../../../../../utils/getClassroomDescription'

interface Props {
    selectedQuarter: string
}

const GetQuarterGradesExcel = ({ selectedQuarter }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const profile = useGetProfileStore(s => s.profile)
    const instructor = profile as Instructor
    const classroom = instructor.clases_details.length === 1 && instructor.clases_details[0].split('-').pop()
    const [selectedClassroom, setSelectedClassroom] = useState(classroom || '')
    const [open, setOpen] = useState(false)

    

    const handleGetQuarterGradesExcel = () => {
        console.log('selectedClassroom', selectedClassroom);
        
        axios.get('http://127.0.0.1:8000/api/student/export_to_excel/', {
            params: {
                classroom: selectedClassroom,
                quarter: selectedQuarter,
                instructor_id: instructor.id
            },
            headers: {
                Authorization: `JWT ${access}`
            },
            responseType: 'blob' // Important for binary files
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
    
            // Set the filename (try to extract from headers or use a default name)
            const contentDisposition = response.headers['content-disposition'];
            let filename = 'quarter_grades.xlsx';
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match) filename = match[1];
            }
    
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading the file:', error);
        });
    };
    

  return (
    <>
        <Button 
            label="Exportar"
            onClick={() => {
                if (instructor.clases_details.length === 1) {
                    handleGetQuarterGradesExcel()
                }
                else {
                    setOpen(true)
                }
            }}
        />
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
        >
            <div className='flex justify-center items-center flex-col gap-4'>
                <Selector 
                    label="Clase"
                    values={instructor.clases_details.map(classroom => ({id: classroom.split('-').pop() || '', name: getClassroomDescription({grade: classroom.split('-')[0], section: classroom.split('-')[1], level: classroom.split('-')[2], lan: 'ES', short: true})}))}
                    setter={setSelectedClassroom}
                    lan='ES'
                />
                <Button 
                    label="Exportar"
                    onClick={handleGetQuarterGradesExcel}
                />
            </div>
        </Modal>
    </>
  )
}

export default GetQuarterGradesExcel