import { logOut } from "@/services/logOut";
import { useNavigate } from "react-router";
import { useState, useCallback } from "react";
import { useUserStore } from "@/stores/userStore";

export function useLogout() {
    const setUser = useUserStore((s) => s.setUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const logout = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            await logOut();
            setUser(null);
        } catch (err) {
            setError(err);
        } finally {
            navigate("/");
            setLoading(false);
        }
    }, [setUser, navigate]);

    return { logout, loading, error };
}