import { create } from "zustand";
import { logInWithPassword } from "@/services/logInWithPassword";
import { getProfile } from "@/services/getProfile";

export const useUserStore = create((set) => ({
    authUser: null,
    user: null,
    error: null,

    setUser: (user) => set({ user }),
    setAuthUser: (authUser) => set({ authUser }),

    logIn: async (email, password) => {
        try {
            const res = await logInWithPassword(email, password);
            const user = res?.user ?? null;
            if (!user) {
                const err = new Error("Login failed: no user returned");
                set({ error: err });
                return { error: err };
            }

            const profile = await getProfile(user.email).catch((err) => {
                set({ error: err.message });
                return null;
            });
            if (!profile) {
                const err = new Error("Failed to fetch user profile");
                set({ error: err.message });
                return { error: err };
            }

            set({ authUser: user });
            set({ user: profile });
            return { user: profile };
        } catch (error) {
            console.error("Failed to log in:", error);
            set({ error: error.message });
        }
    }
}));