import axios from 'axios'
import useGetProfileStore from '../../../../../hooks/store/useGetProfileStore'
import { Instructor } from '../../../../../services/api/instructorService'
import Button from '../../../../ui/Button'
import useAuthStore from '../../../../../hooks/store/useAuthStore'

const GetQuarterGradesExcel = () => {

    const access = useAuthStore(s => s.access) || ''
    const profile = useGetProfileStore(s => s.profile)
    const instructor = profile as Instructor
    const classroom = instructor.clases_details[0].split('-').pop()
    

    

    const handleGetQuarterGradesExcel = () => {
        axios.get('http://127.0.0.1:8000/api/student/export_to_excel/', {
            params: {
                classroom: classroom,
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
    <Button 
        label="Exportar"
        onClick={handleGetQuarterGradesExcel}
    />
  )
}

export default GetQuarterGradesExcel