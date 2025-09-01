import {  supabase } from "@/supabaseClient";

export async function saveBookmark(userId, articleId) {
    try {
        const { data, error } = await supabase
            .from('bookmarks')
            .insert([{ user_id: userId, article_id: articleId }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error saving bookmark:', error);
        throw error;
    }
}