import { saveBookmark } from "@/services/saveBookmark";
import { removeBookmark } from "@/services/removeBookmark";
import { getBookmarkByArticleId } from "@/services/getBookmarkByArticleId";
import { getBookmarksByUser } from "@/services/getBookmarksByUser";
import { useArticleStore } from "@/stores/articleStore";
import { useCallback } from "react";

export function useBookmarks() {
    const setIsSaved = useArticleStore((state) => state.setIsSaved);

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

    const handleCheckBookmark = useCallback(async (userId, articleId) => {
        try {
            const bookmark = await getBookmarkByArticleId(userId, articleId);
            setIsSaved(!!bookmark);
            return bookmark;
        } catch (error) {
            console.error('Failed to check bookmark:', error);
            throw error;
        }
    }, [setIsSaved]);

    const getBookmarsByUserId = useCallback(async (userId) => {
        try {
            const bookmarks = await getBookmarksByUser(userId);
            return bookmarks;
        } catch (error) {
            console.error('Failed to get bookmarks:', error);
            throw error;
        }
    }, []);



    return { handleSaveBookmark, handleRemoveBookmark, handleCheckBookmark, getBookmarsByUserId };
}