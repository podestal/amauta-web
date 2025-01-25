import useAuthStore from "../../../../hooks/store/useAuthStore"

const ClasroomSelector = () => {

    const access = useAuthStore(s => s.access) || ''
    // const {} = 

  return (
    <div>ClasroomSelector</div>
  )
}

export default ClasroomSelector