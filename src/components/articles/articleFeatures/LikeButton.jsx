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
        console.error("Error fetching likes:", err);
      }
    };
    fetchLikes();
  }, [articleId, handleCheckLikes, userId]);

  const handleClick = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      if (hasLiked) {
        await handleUnlike(articleId, userId);
      } else {
        await handleLike(articleId, userId);
      }
    } catch (err) {
      setError(
        `Failed to ${hasLiked ? "unlike" : "like"} the article. ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        aria-pressed={hasLiked} // indica si está activo o no
        aria-label={hasLiked ? "Unlike this article" : "Like this article"}
        className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
          hasLiked ? "text-red-500" : "text-gray-400"
        } hover:text-red-800 transition-colors`}
      >
        <ThumbsUp />
      </button>

      {/* Recuento de likes accesible */}
      <span
        className="text-sm font-semibold text-gray-500"
        aria-live="polite"
        aria-atomic="true"
      >
        {likes}
      </span>

      {error && (
        <p className="text-red-500 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};