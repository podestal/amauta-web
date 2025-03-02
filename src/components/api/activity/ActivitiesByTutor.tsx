import useGetActivitiesByTutor from "../../../hooks/api/activity/useGetActivitiesByTutor"
import useAuthStore from "../../../hooks/store/useAuthStore"

interface Props {
    assignatureId: string
    show: boolean
}

const ActivitiesByTutor = ({ assignatureId, show }: Props) => {

    const access = useAuthStore((s) => s.access) || ""
    const { data: activities, isLoading, isError, error, isSuccess } = useGetActivitiesByTutor({ access, assignatureId, show })

    if (isLoading) return <p className="animate-pulse text-center py-2">Un Momento ...</p>

    if (isError) return <p>Error {error.message}</p>

    if (isSuccess)

  return (
    <div>
        {activities.map(activity => (
            <>{activity.title}</>
        ))}
        <>{console.log('activities', activities)}</>
    </div>
  )
}

export default ActivitiesByTutor