import { saveBookmark } from "@/services/saveBookmark";

export function useSaveBookmark() {
    const handleSaveBookmark = async (userId, articleId) => {
        try {
            const bookmark = await saveBookmark(userId, articleId);
            return bookmark;
        } catch (error) {
            console.error('Failed to save bookmark:', error);
            throw error;
        }
    };

    return { handleSaveBookmark };
}