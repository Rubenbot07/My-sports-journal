import { supabase } from "@/supabaseClient";

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
