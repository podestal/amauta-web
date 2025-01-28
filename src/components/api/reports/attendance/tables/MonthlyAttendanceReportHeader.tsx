interface Props {
    selectedMonth: string
    setSelectedMonth: React.Dispatch<React.SetStateAction<string>>
}

const MonthlyAttendanceReportHeader = ({ selectedMonth, setSelectedMonth }: Props) => {
  return (
    <div>MonthlyAttendanceReportHeader</div>
  )
}

export default MonthlyAttendanceReportHeader