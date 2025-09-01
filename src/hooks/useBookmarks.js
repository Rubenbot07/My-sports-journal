import { saveBookmark } from "@/services/saveBookmark";
import { removeBookmark } from "@/services/removeBookmark";

export function useBookmarks() {
    const handleSaveBookmark = async (userId, articleId) => {
        try {
            const bookmark = await saveBookmark(userId, articleId);
            return bookmark;
        } catch (error) {
            console.error('Failed to save bookmark:', error);
            throw error;
        }
    };

    const handleRemoveBookmark = async (userId, articleId) => {
        try {
            const bookmark = await removeBookmark(userId, articleId);
            return bookmark;
        } catch (error) {
            console.error('Failed to remove bookmark:', error);
            throw error;
        }
    };

    return { handleSaveBookmark, handleRemoveBookmark };
}