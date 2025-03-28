import { create } from "zustand";
import { User } from "../types/user";
interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>((set: any) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));

export default useAuthStore;
