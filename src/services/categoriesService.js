import { supabase } from "@/supabaseClient";


export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select(`*`);

  if (error) throw error;
  return data;
}

export async function getCategoriesById(id) {
  const { data, error } = await supabase
    .from("categories")
    .select(`*, articles(*)`)
    .eq('id', id)
    .eq("articles.status", "published");

  if (error) throw error;
  return data;
}

export async function getCategoryBySlug(slug) {
  const { data, error } = await supabase
    .from("categories")
    .select(`*, articles(*, media(*))`)
    .eq('slug', slug)
    .eq("articles.status", "published");

  if (error) throw error;
  return data;
}
