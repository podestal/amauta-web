import { Student } from "../../../../services/api/studentsService"
import Switch from "../../../ui/Switch"
import { UpdateStudentData } from "../../../../hooks/api/student/useUpdateStudent"
import { UseMutationResult } from "@tanstack/react-query"
import useAuthStore from "../../../../hooks/store/useAuthStore"
import useNotificationsStore from "../../../../hooks/store/useNotificationsStore"

interface Props {
    student: Student
    updateStudent: UseMutationResult<Student, Error, UpdateStudentData>
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateStudentStatus = ({ student, updateStudent, isActive, setIsActive }: Props) => {

    const { setMessage, setType, setShow } = useNotificationsStore()
    const access = useAuthStore(s => s.access) || ''
    const {
        uid, 
        prev_school,
        first_name,
        last_name,
        clase,
        main_language,
        second_language,
        number_of_siblings,
        place_in_family,
        religion,
        address,
        insurance,
        phone_number,
        celphone_number,
        other_insurance,
        lives_with,
        school
        } = student

    const handleSwitchStatus = () => {
        setIsActive( prev => !prev)
        updateStudent.mutate({ 
        student:
        {        
            uid,
            prev_school,
            first_name,
            last_name,
            clase: clase.id,
            main_language,
            second_language,
            number_of_siblings,
            place_in_family,
            religion,
            address,
            phone_number,
            celphone_number,
            insurance,
            other_insurance,
            lives_with,
            school: school,
            is_active: !student.is_active},
        access }, { 
            onSuccess: res => {
                console.log(res)
                setShow(true)
                setType('success')
                setMessage(`${!isActive ? `Alumno activado` : `Alumno desactivado`} con éxito`)
            }})
    }

  return (
    <div className="flex gap-8 items-center">
        <p className={`font-bold ${isActive ? 'text-green-600' : 'text-amber-400'}`}>{isActive ? 'Activo' : 'Inactivo'}</p>
        <Switch 
            value={isActive}
            setter={handleSwitchStatus}
        />
    </div>

  )
}

export default UpdateStudentStatus