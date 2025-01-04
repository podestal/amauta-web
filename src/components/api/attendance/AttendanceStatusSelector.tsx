import Selector from "../../ui/Selector"
import useLanguageStore from "../../../hooks/store/useLanguageStore"
import { getAttendanceStatus } from "../../../utils/data"



interface Props {
    setSelectedStatus:  React.Dispatch<React.SetStateAction<string>>
    selectedStatus: string
}

const AttendanceStatusSelector = ({ setSelectedStatus, selectedStatus } : Props) => {

    const lan = useLanguageStore(s => s.lan)
    const attendanceStatus = getAttendanceStatus(lan)

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