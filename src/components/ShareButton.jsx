import { Forward } from "lucide-react";
import { useState } from "react";

export const ShareButton = ({ article }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const articleUrl = window.location.origin + "/article/" + article?.id;
  const handleShare = async () => {
    if (navigator.share) {
      setLoading(true);
      try {
        await navigator.share({
          title: article?.title,
          text: "Check out this article!",
          url: articleUrl,
        });
      } catch (err) {
        setError("Sharing failed: " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
         try {
        await navigator.clipboard.writeText(articleUrl);
        setMessage("Link copied to clipboard!");
      } catch (err) {
        setMessage("Failed to copy link." + err.message);
      }
    }
    
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleShare}
        disabled={loading}
        className="hover:text-red-800 text-gray-400 py-2 px-4 rounded mr-2"
      >
        <Forward />
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}
    </div>
  );
};