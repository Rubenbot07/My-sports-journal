import { supabase } from "@/supabaseClient";

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