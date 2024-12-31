import { useEffect } from "react"
import useLoadingStore from "../store/useLoadingStore"

const useLoader = (isLoading: boolean) => {

    const setIsLoading = useLoadingStore(s => s.setIsLoading)

    useEffect(() => {
        setIsLoading(isLoading)
        return () => setIsLoading(false)
    }, [isLoading, setIsLoading])
}   

export default useLoader