import { supabase } from "@/supabaseClient";

export async function getArticles(limit = 20) {
  const { data, error } = await supabase
    .from("articles")
    .select(`*, media(*), categories(*)`)
    .eq('status', 'published')
    .limit(limit);

  if (error) throw error;
  return data;
}