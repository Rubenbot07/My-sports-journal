import { supabase } from '@/supabaseClient.js';

export async function getComments(articleId) {
    try {
        const { data, error } = await supabase
            .from('comments')
            .select(`*, profiles:author_id(*)`)
            .eq('article_id', articleId)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}