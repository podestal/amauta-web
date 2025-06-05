import AssignaturesAdmin from "../components/api/assignatures/AssignaturesAdmin"
import ClassroomsAdmin from "../components/api/ClassRooms/ClassroomsAdmin"
import Staff from "../components/api/staff/Staff"
import Tabs from "../components/ui/Tabs"

const AdminPage = () => {
  return (
    <div  className="w-full pt-10 max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden">
        {/* <ClassroomsAdmin /> */}
        <Tabs
          tabs={[
            { label: "Clases", content: <ClassroomsAdmin /> },
            { label: "Staff", content: <Staff /> },
            { label: 'Cursos', content: <AssignaturesAdmin />}
          ]}
        />
    </div>
  )
}

export default AdminPage