import { create } from 'zustand';
import { UserProfile } from '@/types/user';

interface AuthState {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;  
  setUser: (user: UserProfile) => void;
  logout: () => void;
  setLoading: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,           
  setUser: (user) => set({ user, isLoggedIn: true, isLoading: false }),
  logout: () => set({ user: null, isLoggedIn: false }),
  setLoading: (val) => set({ isLoading: val }),
}));