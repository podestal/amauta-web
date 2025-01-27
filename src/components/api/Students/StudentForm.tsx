import Button from "../../ui/Button"
import Input from "../../ui/Input"
import TextArea from "../../ui/TextArea"

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const StudentForm = ({ setPage }: Props) => {
  return (
    <form className="flex flex-col gap-6 py-12">
        <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 mb-16">
          <h2 className="text-2xl text-left font-semibold mb-6">Datos Personales</h2>
        </div>
        <div className="w-full grid grid-cols-6 gap-4">
          <Input 
              label="DNI"
          />
          <div className="col-span-2">
            <Input 
                label="IE de Procedencia"
            />
          </div>
          <div>
            <p>Nivel</p>
            <p>Primaria</p>
            <p>Secundaria</p>
          </div>
          <div>
            <p>Grado</p>
          </div>
          <div>
            <p>Sección</p>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          <Input 
            label="Apellido Paterno"
          />
          <Input 
            label="Apellido Materno"
          />
          <Input 
            label="Nombres"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <p>Fecha de nacimiento (calendat)</p>
          <Input 
            label="Departamento"
          />
          <Input 
            label="Provincia"
          />
          <Input 
            label="Distrito"
          />
        </div>
        <div className="grid grid-cols-4 gap-4 items-start">
          <div className="flex flex-col gap-4">
            <Input 
              label="Lengua Materna"
            />
            <Input 
              label="Segunda Lengua"
            />
          </div>
          <Input 
            label='Número de Hermanos'
          />
          <Input 
            label='Lugar que ocupa'
          />
          <Input 
            label="Religión"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Input 
            label="Dirección Domociliaria"
          />
          <Input
            label="Teléfono"
          />
          <Input
            label="Celular"
          />
          <p>Croquis (google maps)</p>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <p>Seguro:</p>
          <p>{'Essalud ( )'}</p>
          <p>{'SIS ( )'}</p>
          <p>{'Privado ( )'}</p>
          <p>{'Sin seguro ( )'}</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <p>Nació de parto natural:</p>
          <p>{'Si ( )'}</p>
          <p>{'No ( )'}</p>
          <TextArea 
            placeholder="Sufre de alguna enfermedad"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <p>Con quién vive</p>
          <p>{'Mamá ( )'}</p>
          <p>{'Papá ( )'}</p>
          <p>{'Apoderado ( ): Nombre'}</p>
        </div>
        <div className="w-[50%] grid grid-cols-2 gap-4">
          <Input 
            label="Peso Actual"
          />
          <Input 
            label="Talla Actual"
          />
        </div>
        <div className="w-full border-b-2 dark:border-gray-600 border-gray-300 my-16">
          <h2 className="text-2xl text-left font-semibold mb-6">En Caso de Emergencia</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input 
            label="Dirección"
          />
          <Input 
            label="Teléfono"
          />
          <Input 
            label="Preguntar por:"
          />
        </div>
        <div className="my-8 w-full flex justify-end">
          <Button 
            label="Siguiente"
            onClick={() => {
              setPage(prev => prev + 1)
            }}
          />
        </div>
    </form>
  )
}

export default StudentForm