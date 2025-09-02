import { supabase } from "@/supabaseClient";

export async function getArticleById(id) {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select(`*, media(*), categories(*), profiles!articles_author_id_fkey (display_name)`)
      .eq('id', id)
      .eq('status', 'published')
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error fetching article:", err.message);
    throw new Error("Could not fetch article");
  }
}