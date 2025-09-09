import { useCallback, useState } from 'react';
import { likeArticle, removeLike, getArticleLikes, getArticleLikeByUser } from '@/services/likesService';

export function useLikes() {
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    const handleLike = async (articleId, userId) => {
        try {
            const like = await likeArticle(articleId, userId);
            setLikes((prev) => prev + 1);
            setHasLiked(true);
            return like;
        } catch (error) {
            console.error('Failed to like article:', error);
            setHasLiked(false);
            throw error;
        }
    };

    const handleUnlike = async (articleId, userId) => {
        try {
            const removedLike = await removeLike(articleId, userId);
            setLikes((prev) => Math.max(prev - 1, 0));
            setHasLiked(false);
            return removedLike;
        } catch (error) {
            console.error('Failed to unlike article:', error);
            setHasLiked(true);
            throw error;
        }
    }

    const handleCheckLikes = useCallback(async (articleId, userId) => {
        try {
            const fetchedLikes = await getArticleLikes(articleId);
            setLikes(fetchedLikes.length);

            const userLike = await getArticleLikeByUser(articleId, userId);
            if (!userLike) {
                setHasLiked(false);
                return;
            }
            setHasLiked(true);
        } catch (error) {
            console.error('Failed to fetch likes:', error);
            setHasLiked(false);
            throw error;
        } 

    }, [setLikes, setHasLiked]);

    return { likes, hasLiked, handleLike, setLikes, setHasLiked, handleCheckLikes, handleUnlike };
}