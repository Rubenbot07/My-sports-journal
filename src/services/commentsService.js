import {  supabase } from "@/supabaseClient";

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

