import moment from "moment"

const getUnpaidInfo = () => {
    const today = moment()
    const startOfMonth = moment().startOf("month")
    console.log(today.diff(startOfMonth, "days"));
    
}

export default getUnpaidInfo