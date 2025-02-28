import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getActivityService, { Activity, UpdateCreateActivity } from "../../../services/api/activityService"

export interface CreateActivityData {
    access: string
    activity: UpdateCreateActivity
}

interface Props {
    assignatureId: string
}

const useCreateActivity = ({ assignatureId }: Props): UseMutationResult<Activity, Error, CreateActivityData> => {
    const activityService = getActivityService({ })
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateActivityData) => activityService.post(data.activity, data.access),
        onSuccess: res => {
            queryClient.setQueryData<Activity[]>([`activities ${assignatureId}`], (oldData) => {
                if (!oldData) return [res]
                return [...oldData, res]
            })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateActivity