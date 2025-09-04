import { supabase } from '@/supabaseClient'

export async function editComment(commentId, body) {
    try {
        const { data, error } = await supabase
            .from('comments')
            .update({ body: body })
            .eq('id', commentId)
            .select(`*, profiles:author_id(*)`)
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error editing comment:', error);
        return null;
    }
}