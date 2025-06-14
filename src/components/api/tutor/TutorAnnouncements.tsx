import { useState } from 'react'
import TutorAnnouncementsList from './TutorAnnouncementsList'
import moment from 'moment'
import TutorAgendaDateSelector from './TutorAgendaDateSelector'

interface Props {
    studentId: string
}

const TutorAnnouncements = ({ studentId }: Props) => {

    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))


  return (
    <div className='flex flex-col pb-10 mb-10'>
        <TutorAgendaDateSelector 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
        />
        <TutorAnnouncementsList 
            studentId={studentId}
            selectedDate={selectedDate}
        />
    </div>
  )
}

export default TutorAnnouncements