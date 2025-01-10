import useLanguageStore from "../../hooks/store/useLanguageStore"
import Selector from "./Selector"

interface Props {
    setSelectedMonth: React.Dispatch<React.SetStateAction<string>>
}

const MonthSelector = ({ setSelectedMonth }: Props) => {

    const lan = useLanguageStore(s => s.lan)
    const months = [
        {id: '1', name: lan === 'EN' ? 'January' : 'Enero'},
        {id: '2', name: lan === 'EN' ? 'February' : 'Febrero'},
        {id: '3', name: lan === 'EN' ? 'March' : 'Marzo'},
        {id: '4', name: lan === 'EN' ? 'April' : 'Abril'},
        {id: '5', name: lan === 'EN' ? 'May' : 'Mayo'},
        {id: '6', name: lan === 'EN' ? 'June' : 'Junio'},
        {id: '7', name: lan === 'EN' ? 'July' : 'Julio'},
        {id: '8', name: lan === 'EN' ? 'August' : 'Agosto'},
        {id: '9', name: lan === 'EN' ? 'September' : 'Septiembre'},
        {id: '10', name: lan === 'EN' ? 'October' : 'Octubre'},
        {id: '11', name: lan === 'EN' ? 'November' : 'Noviembre'},
        {id: '12', name: lan === 'EN' ? 'December' : 'Diciembre'},
    ]

  return (
    <Selector 
        values={months}
        setter={setSelectedMonth}
        defaultValue="1"
        
    />
  )
}

export default MonthSelector