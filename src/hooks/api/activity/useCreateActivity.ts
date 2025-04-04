import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getActivityService, { Activity, UpdateCreateActivity } from "../../../services/api/activityService"

export interface CreateActivityData {
    access: string
    activity: UpdateCreateActivity
}

interface Props {
    assignatureId: string
    quarter: string
    classroom: string
}

const useCreateActivity = ({ assignatureId, quarter, classroom }: Props): UseMutationResult<Activity, Error, CreateActivityData> => {
    const activityService = getActivityService({ })
    const queryClient = useQueryClient()
    const params = { classroom }

    return useMutation({
        mutationFn: (data: CreateActivityData) => activityService.post(data.activity, data.access, params),
        onSuccess: res => {
            queryClient.setQueryData<Activity[]>([`activities ${quarter} ${assignatureId}`], (oldData) => {
                if (!oldData) return [res]
                return [res, ...oldData]
            })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateActivity