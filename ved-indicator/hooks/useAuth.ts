import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isLoggedIn: boolean
  setLoggedIn: (status: boolean) => void
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setLoggedIn: (status) => set({ isLoggedIn: status }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuth 