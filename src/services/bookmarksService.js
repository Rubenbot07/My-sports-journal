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


export const getBookmarksByUser = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('bookmarks')
            .select(`articles(*, media(*))`)
            .eq('user_id', userId);

        if (error) {
            throw error;
        }

        const formattedData = data.map((item) => item.articles);

        return formattedData;
    } catch (error) {
        console.error('Error fetching bookmarks by user:', error);
        throw error;
    }
};

export async function saveBookmark(userId, articleId) {
    try {
        const { data, error } = await supabase
            .from('bookmarks')
            .insert([{ user_id: userId, article_id: articleId }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error saving bookmark:', error);
        throw error;
    }
}
export async function removeBookmark(userId, articleId) {
    try {
        const { data, error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('user_id', userId)
            .eq('article_id', articleId)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error removing bookmark:', error);
        throw error;
    }
}