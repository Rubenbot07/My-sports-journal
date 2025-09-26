import { BookmarkButton } from "@/components/articles/articleFeatures/BookmarkButton";
import { LikeButton } from "@/components/articles/articleFeatures/LikeButton";
import { ShareButton } from "@/components/articles/articleFeatures/ShareButton";

export const ActionButtonsContainer = ({ article, userId }) => {

    return (
        <div className="flex bg-gray-200 rounded-xl w-fit px-4">
            <BookmarkButton articleId={article?.id} userId={userId} />
            <LikeButton articleId={article?.id} userId={userId} />
            <ShareButton article={article} />
        </div>
    );
}