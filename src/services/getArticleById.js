import { supabase } from "@/supabaseClient";

export async function getArticleById(id) {
  const { data, error } = await supabase
    .from("articles")
    .select(`*, media(*), categories(*), profiles!articles_author_id_fkey (display_name)`)
    .eq('id', id)
    .eq('status', 'published')
  if (error) throw error;
  return data;
}