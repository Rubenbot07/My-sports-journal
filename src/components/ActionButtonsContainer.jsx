import { BookmarkButton } from "@/components/BookmarkButton";
import { LikeButton } from "@/components/LikeButton";
import { ShareButton } from "@/components/ShareButton";

export const ActionButtonsContainer = ({ articleId, userId }) => {

    return (
        <div className="flex bg-gray-200 rounded-xl w-fit px-4">
            <BookmarkButton articleId={articleId} userId={userId} />
            <LikeButton articleId={articleId} userId={userId} />
            <ShareButton />
        </div>
    );
}