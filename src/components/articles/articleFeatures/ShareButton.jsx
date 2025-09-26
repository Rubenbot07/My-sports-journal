import { Forward } from "lucide-react";
import { useState } from "react";

export const ShareButton = ({ article }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const articleUrl = window.location.origin + "/articles/" + article?.id;

  const handleShare = async () => {
    if (navigator.share) {
      setLoading(true);
      try {
        await navigator.share({
          title: article?.title,
          text: "Check out this article!",
          url: articleUrl,
        });
        setMessage("Article shared successfully!");
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
        setError("Failed to copy link. " + err.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        onClick={handleShare}
        disabled={loading}
        aria-label={`Share the article: ${article?.title}`}
        className="hover:text-red-800 text-gray-400 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <Forward aria-hidden="true" />
      </button>

      {/* Mensajes accesibles */}
      {error && (
        <p className="text-red-500 text-sm" role="alert">
          {error}
        </p>
      )}
      {message && (
        <p
          className="text-sm text-gray-600 sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {message}
        </p>
      )}
    </div>
  );
};