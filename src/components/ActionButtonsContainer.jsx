import { BookmarkButton } from "@/components/BookmarkButton";
import { LikeButton } from "@/components/LikeButton";

export const ActionButtonsContainer = ({ articleId, userId }) => {

    return (
        <div className="flex space-x-4">
            <BookmarkButton articleId={articleId} userId={userId} />
            <LikeButton articleId={articleId} userId={userId} />
        </div>
    );
}