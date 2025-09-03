import { supabase } from "@/supabaseClient";

export const removeLike = async (articleId, userId) => {
    try {
        const { data, error } = await supabase
            .from('likes')
            .delete()
            .eq('article_id', articleId)
            .eq('user_id', userId)
            .select();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error removing like from article:', error);
        throw error;
    }
}