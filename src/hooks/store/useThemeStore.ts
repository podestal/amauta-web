import { create } from "zustand"

interface ThemeState {
    theme: string
    switchTheme: (theme: string) => void
}

const useThemeStore = create<ThemeState>(set => ({
    // theme: window.matchMedia("(prefers-color-scheme: dark)") ? 'dark' : 'ligth',
    theme: 'light',
    switchTheme: (theme) => {
        if (theme === 'light') {
            set({ theme: 'dark' })
        } else {
            set({ theme: 'light' })
        }
    }
}))

export default useThemeStore