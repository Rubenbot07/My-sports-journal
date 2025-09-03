import { supabase } from "@/supabaseClient";

export const likeArticle = async (articleId, userId) => {
    try {
        const { data, error } = await supabase
            .from('likes')
            .insert([{ article_id: articleId, user_id: userId }])
            .select();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error liking article:', error);
        throw error;
    }
}