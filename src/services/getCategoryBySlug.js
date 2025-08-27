import { supabase } from "@/supabaseClient";

async function getCategoryById(slug) {
  const { data, error } = await supabase
    .from("categories")
    .select(`*, articles(*, media(*))`)
    .eq('slug', slug)

  if (error) throw error;
  return data;
}

export { getCategoryById as getCategoryBySlug };