import {  supabase } from "@/supabaseClient";

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