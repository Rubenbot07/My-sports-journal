import { useEffect } from "react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useArticleStore } from "@/stores/articleStore";
import { BookmarkButton } from "@/components/BookmarkButton";

export const BookmarkButtonsContainer = ({ articleId, userId }) => {
    const { handleCheckBookmark } = useBookmarks();
    const isSaved = useArticleStore((state) => state.isSaved);
    const setIsSaved = useArticleStore((state) => state.setIsSaved);

        useEffect(() => {
            const checkIfSaved = async () => {
                if (userId) {
                    try {
                        await handleCheckBookmark(userId, articleId);
                    } catch (err) {
                        console.error('Error checking bookmark:', err);
                    }
                }
            };
            checkIfSaved();
        }, [articleId, userId, handleCheckBookmark]);
    

    return (
        <div className="flex space-x-4">
            <BookmarkButton articleId={articleId} userId={userId} isSaved={isSaved} setIsSaved={setIsSaved} />
        </div>
    );
}