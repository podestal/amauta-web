import { create } from "zustand"

interface LoadingState {
    isLoading: boolean
    setIsLoading: (value: boolean) => void 
}

const useLoadingStore = create<LoadingState>(set => ({
    isLoading: false,
    setIsLoading: (value) => set({ isLoading: value })
}))

export default useLoadingStore