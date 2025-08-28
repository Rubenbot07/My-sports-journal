import { logOut } from "@/services/logOut";

import { useState, useCallback } from "react";
import { useUserStore } from "@/stores/userStore";

export function useLogout() {
    const setUser = useUserStore((s) => s.setUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const logout = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            await logOut();
            setUser(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [setUser]);

    return { logout, loading, error };
}