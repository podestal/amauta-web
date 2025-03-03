import useGetActivitiesByAssignature from "../../../../../hooks/api/activity/useGetActivitiesByAssignature"
import useAuthStore from "../../../../../hooks/store/useAuthStore"
import useLoader from "../../../../../hooks/ui/useLoader"

interface Props {
    assignatureId: string
    competence: string
}

const GradesTableActivitiesHeader = ({ assignatureId, competence }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const { data: activities, isLoading, isError, error, isSuccess } = useGetActivitiesByAssignature({ access, assignatureId, competence })

    useLoader(isLoading)

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div>
        <p>Activities ....</p>
        <>{console.log('activities', activities)}</>
    </div>
  )
}

export default GradesTableActivitiesHeader