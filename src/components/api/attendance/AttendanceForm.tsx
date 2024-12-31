import { useState } from "react"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import Button from "../../ui/Button"
import TextArea from "../../ui/TextArea"
import AttendanceStatusSelector from "./AttendanceStatusSelector"

const AttendanceForm = () => {

    const lan = useLanguageStore(s => s.lan)
    const [selectedStatus, setSelectedStatus] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('selectedStatus', selectedStatus)
        
    }

  return (
    <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 justify-center items-center w-[70%] mx-auto">
        <h2 className="text-xl">{lan === 'EN' ? 'Register Attendance' : 'Registar Asistencia'}</h2>
        <AttendanceStatusSelector 
            setSelectedStatus={setSelectedStatus}
        />
        <TextArea 
            placeholder={lan === 'EN' ? 'Observations' : 'Observaciones'}
        />
        <Button 
            label={lan === 'EN' ? 'Register' : 'Registrar'}
        />
    </form>
  )
}

export default AttendanceForm