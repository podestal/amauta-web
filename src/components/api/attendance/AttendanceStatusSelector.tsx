import Selector from "../../ui/Selector"
import useLanguageStore from "../../../hooks/store/useLanguageStore"



interface Props {
    setSelectedStatus:  React.Dispatch<React.SetStateAction<string>>
    selectedStatus: string
}

const AttendanceStatusSelector = ({ setSelectedStatus, selectedStatus } : Props) => {

    const lan = useLanguageStore(s => s.lan)
    const attendanceStatus = [
        {
            id: 'O',
            name: lan === 'EN' ? 'On Time' : 'Temprano',
        },
        {
            id: 'L',
            name: lan === 'EN' ? 'Late' : 'Tardanza',
        },
        {
            id: 'N',
            name: lan === 'EN' ? 'Not Attended' : 'Falta',
        },
        {
            id: 'E',
            name: lan === 'EN' ? 'Excused' : 'Excusado',
        },
        {
            id: 'T',
            name: lan === 'EN' ? 'Left Early' : 'Salida Temprano',
        },
    ]

  return (
    <div className="w-full">
        <Selector 
            values={attendanceStatus}
            setter={setSelectedStatus}
            defaultValue={selectedStatus}
            label={'Status'}
        />
    </div>
  )
}

export default AttendanceStatusSelector