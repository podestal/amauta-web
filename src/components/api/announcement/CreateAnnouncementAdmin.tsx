import { useState } from "react"
import Button from "../../ui/Button"
import Slider from "../../ui/Slider"
import AnnouncementAdminForm from "./AnnouncementAdminForm"
import useAuthStore from "../../../hooks/store/useAuthStore"
import useSchoolStore from "../../../hooks/store/useSchoolStore"
import useGetClassroom from "../../../hooks/api/classroom/useGetClassroom"

const CreateAnnouncementAdmin = () => {
    const access = useAuthStore(s => s.access) || ''
    const school = useSchoolStore(s => s.school).id.toString()
    const [open, setOpen] = useState(false)
    const {data: classrooms, isLoading, isError, isSuccess, error} = useGetClassroom({ access, school })

    if (isLoading) return <p className="animate-pulse text-center">Cargando...</p>

    if (isError) return <p>{error?.message}</p>

    if (isSuccess)

  return (
    <>
        <div className="flex justify-center items-center mb-10">
            <Button 
                label="Create Announcement"
                onClick={() => setOpen(true)}
            />
        </div>
        <Slider
            isOpen={open}
            setOpen={setOpen}>
                <AnnouncementAdminForm 
                    classrooms={classrooms}
                />
        </Slider>
    </>
  )
}

export default CreateAnnouncementAdmin