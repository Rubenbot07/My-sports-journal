import { useState, useTransition } from "react";
import { signUp } from "@/services/authService";
import { createProfile } from "@/services/createProfile";
import { useNavigate } from "react-router";
import { useUserStore } from "@/stores/userStore";
import { createRole } from "@/services/createRole";

export function useSignUp() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const setUser = useUserStore((s) => s.setUser);
    const navigate = useNavigate();

  const handleSignUp = async ({ email, password, repeatPassword, username }) => {
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    startTransition(async () => {
      try {
        const { data, error } = await signUp({ email, password });

        if (error) {
          console.error(error);
          setError(error.message);
          return;
        }

        // Crear el perfil del usuario
        const profile = await createProfile({username, email, authId: data.user.id});
        await createRole(2, data.user.id);

        setUser(profile[0]);
        // Redirigir a la vista de inicio de sesión
        navigate("/");
        // Aquí puedes manejar lógica extra:
        // - Guardar el usuario en Zustand
        // - Redirigir a otra vista
        // - Mostrar toast de éxito

        return { data };
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return {
    handleSignUp,
    error,
    isLoading,
    isPending,
  };
}