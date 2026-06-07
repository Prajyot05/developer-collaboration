import { create } from "zustand";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (isDark: boolean) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  isDark: true, // Default to dark
  toggleTheme: () =>
    set((state) => {
      const newIsDark = !state.isDark;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newIsDark);
      }
      return { isDark: newIsDark };
    }),
  setDark: (isDark: boolean) => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", isDark);
    }
    set({ isDark });
  },
}));

export default useThemeStore;
