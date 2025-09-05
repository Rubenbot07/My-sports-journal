import { useBookmarks } from "@/hooks/useBookmarks";
import { useArticleStore } from "@/stores/articleStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Bookmark } from "lucide-react";

export const BookmarkButton = ({ articleId, userId }) => {
  const { handleSaveBookmark, handleRemoveBookmark, handleCheckBookmark } = useBookmarks();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isSaved = useArticleStore((state) => state.isSaved);
  const setIsSaved = useArticleStore((state) => state.setIsSaved);
  const navigate = useNavigate();
  
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
  const handleClick = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      if (isSaved) {
        await handleRemoveBookmark(userId, articleId);
        setIsSaved(false);
      } else {
        await handleSaveBookmark(userId, articleId);
        setIsSaved(true);
      }
    } catch (err) {
      setError("Failed to update favorites. " + err.message);
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
          isSaved ? "text-red-500" : "text-gray-400"
        } hover:text-red-800 transition-colors`}
      >
        {isSaved ?  <Bookmark fill="currentColor" /> : <Bookmark />}
      </button>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};