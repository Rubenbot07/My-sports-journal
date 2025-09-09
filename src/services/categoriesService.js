import { supabase } from "@/supabaseClient";

export async function getCategoriesById(id) {
  const { data, error } = await supabase
    .from("categories")
    .select(`*, articles(*)`)
    .eq('id', id)

  if (error) throw error;
  return data;
}

export async function getCategoryBySlug(slug) {
  const { data, error } = await supabase
    .from("categories")
    .select(`*, articles(*, media(*))`)
    .eq('slug', slug)

  if (error) throw error;
  return data;
}
