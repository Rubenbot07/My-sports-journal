import { supabase } from "@/supabaseClient";

export const logInWithPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return { user: data.user, error};
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}

export function onAuthStateChange(handler) {
  // devuelve el objeto subscription para poder hacer unsubscribe
  const { data } = supabase.auth.onAuthStateChange(handler);
  return data?.subscription;
}

export async function signUp({ email, password }) {
    // Supabase v2
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    return { data, error }
}

export async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
    });

    return { error };
}