import { supabase } from '@/supabaseClient';

export const getBookmarksByUser = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('bookmarks')
            .select(`articles(*, media(*))`)
            .eq('user_id', userId);

        if (error) {
            throw error;
        }

        const formattedData = data.map((item) => item.articles);

        return formattedData;
    } catch (error) {
        console.error('Error fetching bookmarks by user:', error);
        throw error;
    }
};