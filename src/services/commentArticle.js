import { supabase } from '@/supabaseClient.js';

export async function commentArticle(articleId, authorId, body) {
    try {
        const { data, error } = await supabase
            .from('comments')
            .insert([
                { article_id: articleId, author_id: authorId, body: body }
            ])
            .select(`*, profiles:author_id(*)`)
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error adding comment:', error);
        return null;
    }
}