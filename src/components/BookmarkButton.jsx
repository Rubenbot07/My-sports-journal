import { useBookmarks } from "@/hooks/useBookmarks";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Bookmark } from "lucide-react";

export const BookmarkButton = ({ articleId, userId, isSaved, setIsSaved }) => {
  const { handleSaveBookmark, handleRemoveBookmark } = useBookmarks();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        } hover:text-blue-800 transition-colors`}
      >
        {isSaved ?  <Bookmark fill="currentColor" /> : <Bookmark />}
      </button>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};