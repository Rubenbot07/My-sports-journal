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

export const getArticleLikes = async (articleId) => {
    try {
        const { data, error } = await supabase
            .from('likes')
            .select('*')
            .eq('article_id', articleId);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching likes by article:', error);
        throw error;
    }
}


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