import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { Student } from "../../../services/api/studentsService"
import getClassroomDescription from "../../../utils/getClassroomDescription"
import Button from "../../ui/Button"

interface Props {
    student: Student
}

// SPANISH_LANGUAGE = 'S'
// ENGLISH_LANGUAGE = 'E'
// QUECHUA_LANGUAGE = 'Q'
// AYMARA_LANGUAGE = 'A'

const religions: Record<string, string> = {
    C: 'Católica',
    E: 'Evangélica',
    J: 'Judía',
    I: 'Musulmana',
    B: 'Budista',
    M: 'Mormona',
    T: 'Testigo de Jehová',
    R: 'Cristiana',
    O: 'Otra'
}

const languages: Record<string, string> = {
    S: 'Español',
    E: 'Inglés',
    Q: 'Quechua',
    A: 'Aymara',
}

const StudentInfo = ({ student }: Props) => {

        // religion: string
        // address: string
        // phone_number: string
        // celphone_number: string
        // map_location: string
        // insurance: string
        // lives_with: string
        // health_info:HealthInfo | null
        // birth_info: BirthInfo | null
        // emergency_contact: EmergencyContact | null
        // prev school

    // lan, grade, section, level
    const lan = useLanguageStore(s => s.lan)
    const classroom = getClassroomDescription({ lan, grade: student.clase.grade, section: student.clase.section, level: student.clase.level })

  return (
    <div>
        <div className="w-full flex justify-between items-center my-6">
            <h2 className="text-5xl text-center font-bold">Ficha de Estudiante</h2>
            <Button 
                label="Imprimir"
                onClick={() => console.log('Edit')}
            />
        </div>
        <div className="w-full flex justify-between items-start gap-4 my-4">
            <div>
                <p className="text-3xl font-bold mb-2">{student.first_name} {student.last_name}</p>
                <p>DNI: {student.uid}</p>
                Clase: {classroom}
            </div>
            <div className="w-32 h-40 border-2 dark:border-slate-700 border-slate-400  flex justify-center items-center">
                <p>Foto</p>
            </div>
        </div>
        <h2 className="text-xl font-bold my-2">Datos Personales</h2>
        <div className="w-full flex flex-col gap-4 my-6">
            <div className="w-full grid grid-cols-4 gap-4">
                <p>Número de Hermanos: {student.number_of_siblings || '3'}</p>
                <p>Lugar que Ocupa: {student.place_in_family || '1'}</p>
            </div>
            <div className="w-full grid grid-cols-4 gap-4">
                <p>Escuela Anterior: {student.prev_school || 'San Francisco de Asis'}</p>
                <p>Religión: {religions[student.religion ]|| 'Católica'}</p>
                <p>Lengua Materna: {languages[student.main_language] || 'Español'}</p>
                <p>Segunda Lengua: {languages[student.second_language] || '-'}</p>
            </div>
            <div className="w-full grid grid-cols-4 gap-4">
                <p>Dirección: {student.address || 'Avenida Cortes 245'}</p>
                <p>Teléfono: {student.phone_number || '123456'}</p>
                <p>Celular: {student.celphone_number || '123456'}</p>
            </div>
        </div>
        <h2 className="text-xl font-bold my-2">Información de Nacimiento</h2>
        <h2 className="text-xl font-bold my-2">Información de Salud</h2>
        <h2 className="text-xl font-bold my-2">Contacto de Emergecia</h2>
    </div>
  )
}

export default StudentInfo