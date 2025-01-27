import Input from "../../ui/Input"

const StudentForm = () => {
  return (
    <form>
        <h2>Datos Personales</h2>
        <Input 
            label="DNI"
        />
        <Input 
            label="IE de Procedencia"
        />
    </form>
  )
}

export default StudentForm