import { supabase } from "@/supabaseClient";

export async function getArticles(limit = 20) {
  const { data, error } = await supabase
    .from("articles")
    .select(`*, media(*), categories(*)`)
    .eq('status', 'published')
    .is('deleted_at', null)
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getArticleById(id) {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select(`*, media(*), categories(*), profiles!articles_author_id_fkey (display_name, id)`)
      .eq('id', id)
      .eq('status', 'published')
      .is('deleted_at', null)
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error fetching article:", err.message);
    throw new Error("Could not fetch article");
  }
}

export const getMostBookmarkedArticles = async (limit = 10) => {
  const { data, error } = await supabase
    .rpc("most_bookmarked_articles", { limit_count: limit })
  if (error) throw error;
  return data;
};

export const getArticlesByAuthor = async (authorId) => {
  const { data, error } = await supabase
    .from("articles")
    .select(`*, media(*), categories(*)`)
    .eq('author_id', authorId)
    .is('deleted_at', null);

  if (error) throw error;
  return data;
}

export const deleteArticle = async (articleId, deletedBy) => {
  const { data, error } = await supabase
  .from("articles")
  .update({ deleted_at: new Date().toDateString(), deleted_by: deletedBy })
  .eq('id', articleId)

  return { data, error }
}