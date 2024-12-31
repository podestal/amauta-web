import Input from "../../ui/Input"

interface Props {
    setFilter: React.Dispatch<React.SetStateAction<string>>
    filter: string
}

const StudentFilter = ({ filter, setFilter }: Props) => {
  return (
    <div className="my-6">
        <Input 
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Nombre del estudiante"
        />
    </div>
  )
}

export default StudentFilter