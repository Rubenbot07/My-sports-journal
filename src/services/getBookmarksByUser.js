import { supabase } from '@/supabaseClient';

export const getBookmarksByUser = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('bookmarks')
            .select(`*, articles(*, media(*))`)
            .eq('user_id', userId);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching bookmarks by user:', error);
        throw error;
    }
};