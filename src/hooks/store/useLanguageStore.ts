import { create } from "zustand"

interface LanguageState {
    lan: string
    setLan: (lan: string) => void
}

const useLanguageStore = create<LanguageState>(set => ({

    lan: 'ES',
    setLan: (lan) => {
        set({ lan })
    }
}))

export default useLanguageStore