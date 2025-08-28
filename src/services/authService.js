import { supabase } from "@/supabaseClient";

export async function signIn(email, password) {
  // Supabase v2
  return await supabase.auth.signInWithPassword({ email, password });
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