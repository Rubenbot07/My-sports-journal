import { useState, useCallback } from "react";
import { useUserStore } from "@/stores/userStore";
import { logInWithPassword } from "@/services/authService"; // ajusta la ruta si hace falta

export function useLogin() {
  const setUser = useUserStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // tu service puede lanzar o devolver; lo manejamos en ambos casos
      const res = await logInWithPassword(email, password);
      const user = res?.user ?? null;

      if (!user) {
        // si el service no lanzó pero tampoco devolvió user, normalizamos el error
        const err = new Error("Login failed: no user returned");
        setError(err);
        return { error: err };
      }

      // actualizar el store
      setUser(user);

      return { user };
    } catch (err) {
      setError(err);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  return { login, loading, error };
}