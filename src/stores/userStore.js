import { create } from "zustand";

export const useUserStore = create((set) => ({
    authUser: null,
    user: null,
    error: null,
    roles: [],

    setUser: (user) => set({ user }),
    setAuthUser: (authUser) => set({ authUser }),
    setError: (error) => set({ error }),
    setRoles: (roles) => set({ roles }),
}));