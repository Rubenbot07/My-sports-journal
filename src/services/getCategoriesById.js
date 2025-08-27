import { supabase } from "@/supabaseClient";

export async function getCategoriesById(id) {
  const { data, error } = await supabase
    .from("categories")
    .select(`*, articles(*)`)
    .eq('id', id)

  if (error) throw error;
  return data;
}