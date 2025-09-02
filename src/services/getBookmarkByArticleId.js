import { supabase } from '@/supabaseClient.js';

export async function getBookmarkByArticleId(userId, articleId) {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .eq('article_id', articleId)
      .maybeSingle();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error('Error fetching bookmark:', err.message);
    throw new Error('Could not fetch bookmark');
  }
}