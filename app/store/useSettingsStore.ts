import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  notifications: boolean;
  emailUpdates: boolean;
  accountPrivacy: boolean;
  twoFactorAuth: boolean;
  autoUpdates: boolean;
  dataSaver: boolean;
  locationTracking: boolean;
  soundEffects: boolean;
  analyticsSharing: boolean;
  
  setSetting: (key: keyof Omit<SettingsState, "setSetting">, value: boolean) => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: true,
      emailUpdates: true,
      accountPrivacy: false,
      twoFactorAuth: false,
      autoUpdates: true,
      dataSaver: false,
      locationTracking: false,
      soundEffects: true,
      analyticsSharing: true,

      setSetting: (key, value) => set((state) => ({ ...state, [key]: value })),
    }),
    {
      name: "settings-storage",
    }
  )
);

export default useSettingsStore;
