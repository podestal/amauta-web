import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getActivityService, { Activity, UpdateCreateActivity } from "../../../services/api/activityService"

export interface CreateActivityData {
    access: string
    activity: UpdateCreateActivity
}

interface Props {
    activityId?: string
    assignatureId: string
    quarter: string
}

const useUpdateActivity = ({ activityId, assignatureId, quarter }: Props): UseMutationResult<Activity, Error, CreateActivityData> => {
    const activityService = getActivityService({ activityId })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateActivityData) => activityService.update(data.activity, data.access),
        onSuccess: res => {
            console.log('res', res)
            // queryClient.setQueryData<Activity[]>([`activities ${quarter} ${assignatureId}`], (oldData) => {
            //     // if (!oldData) return [res]
            //     // return [res, ...oldData]
            //     oldData?.map((activity) => {
            //         if (activity.id === res.id) {
            //             activity = res
            //         }
            //         return activity
            //     }
            //     )
            // })
            queryClient.invalidateQueries({queryKey: [`activities ${quarter} ${assignatureId}`]})
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useUpdateActivity