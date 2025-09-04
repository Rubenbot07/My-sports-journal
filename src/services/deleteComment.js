import {  supabase } from "@/supabaseClient";

export async function deleteComment(commentId) {
    try {
        const { data, error } = await supabase
            .from('comments')
            .delete()
            .eq('id', commentId)
            .select();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        return null;
    }
}