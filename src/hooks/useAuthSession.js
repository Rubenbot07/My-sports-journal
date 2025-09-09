// hooks/useAuthSessionSimple.js
import { useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { getProfile } from "@/services/profileService";
import { useUserStore } from "@/stores/userStore"; // ajusta la ruta si hace falta
import { getUserRoles } from "@/services/rolesService"; // nuevo service para roles

export function useAuthSession() {
  const setAuthUser = useUserStore((s) => s.setAuthUser);
  const setUser = useUserStore((s) => s.setUser);
  const setRoles = useUserStore((s) => s.setRoles);


  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          setAuthUser(data.session.user);
          const profile = await getProfile(data.session.user.email);
          setUser(profile);
          const roles = await getUserRoles(data.session.user.id);
          setRoles(roles);
        }
      } catch (err) {
        console.error("useAuthSessionSimple getSession error:", err);
      }
    };
    getSession();

    // 2. Escuchar cambios de auth (login, logout, refresh)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthUser(session?.user || null);
        if (session?.user) {
          getProfile(session.user.email)
            .then((profile) => setUser(profile))
            .catch((err) => {
              console.error("useAuthSessionSimple getProfile error:", err);
              setUser(null);
            });
          getUserRoles(session.user.id)
            .then((roles) => setRoles(roles))
            .catch((err) => {
              console.error("useAuthSessionSimple getUserRoles error:", err);
              setRoles([]);
            });
        } else {
          setUser(null);
          setRoles([]);
        }
      }
    );

    // 3. Cleanup
    return () => {
      try {
        // intento de unsubscribe en la forma que usaste originalmente
        subscription?.subscription?.unsubscribe?.();
      } catch (err) {
        console.warn("useAuthSession unsubscribe error:", err);
      }
    };
  }, [setAuthUser, setUser, setRoles]);

  const getProfileAndRoles = async (email, userId) => {
    try {
      const profile = await getProfile(email);
      setUser(profile);
      const roles = await getUserRoles(userId);
      setRoles(roles);
    } catch (err) {
      console.error("useAuthSession getProfileAndRoles error:", err);
      setUser(null);
      setRoles([]);
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("useAuthSession logout error:", err);
    }
  } 

  return { getProfileAndRoles, logout };
}