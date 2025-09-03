import { useState, useEffect } from 'react';
import { useLikes } from '@/hooks/useLikes';
import { useNavigate } from 'react-router';
import { ThumbsUp } from 'lucide-react';

export const LikeButton = ({ articleId, userId }) => {
    const { likes, hasLiked, handleLike, handleCheckLikes, handleUnlike } = useLikes();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!articleId) return;
        const fetchLikes = async () => {
            try {
                await handleCheckLikes(articleId, userId);
            } catch (err) {
                console.error('Error fetching likes:', err);
            }
        };
        fetchLikes();
    }, [articleId, handleCheckLikes, userId]);

    const handleClick = async () => {
        if (!userId) {
            navigate('/login');
            return;
        }

        if (hasLiked) {
            console.log('unlike');
            setLoading(true);
            try {
                await handleUnlike(articleId, userId);
            } catch (err) {
                setError('Failed to unlike the article. ' + err.message);
            } finally {
                setLoading(false);
            }
            return;
        }

        setLoading(true);
        try {
            await handleLike(articleId, userId);
        } catch (err) {
            setError('Failed to like the article. ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start">
            <button
                onClick={handleClick}
                disabled={loading}
                className={`p-2 rounded-full ${
                    hasLiked ? 'text-blue-500' : 'text-gray-400'
                } hover:text-blue-800 transition-colors`}
            >
                <ThumbsUp />
            </button>
            <span className="text-sm mt-1">{likes}</span>
            {error && <p className="text-red-500 mt-1">{error}</p>}
        </div>
    );
}