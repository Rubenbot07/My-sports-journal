import { supabase } from "@/supabaseClient";

export const getArticleLikeByUser = async (articleId, userId) => {
    try {
        const { data, error } = await supabase
            .from('likes')
            .select('*')
            .eq('article_id', articleId)
            .eq('user_id', userId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No like found for this user and article
                return null;
            }
        }

        return data;
    } catch (error) {
        console.error('Error fetching like by user for article:', error);
        throw error;
    }
}