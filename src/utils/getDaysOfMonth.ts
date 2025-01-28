import moment from "moment"

const getDaysOfMonth = (month: number): number[] => {   
    const totalDays =  moment(`${new Date().getFullYear()}-${month}`).daysInMonth()
    return Array.from({ length: totalDays }, (_, i) => i + 1)
}

export default getDaysOfMonth