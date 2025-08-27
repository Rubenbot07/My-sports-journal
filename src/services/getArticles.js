import { supabase } from "@/supabaseClient";

export async function getArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select(`*, media(*), categories(*)`)
    .eq('status', 'published')

  if (error) throw error;
  return data;
}