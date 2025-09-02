import { useBookmarks } from "@/hooks/useBookmarks";
import { useState } from "react";
import { useNavigate } from "react-router";


export const RemoveFromFavorites = ({ articleId, userId, isSaved, setIsSaved }) => {
    const { handleRemoveBookmark } = useBookmarks();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await handleRemoveBookmark(userId, articleId);
            setIsSaved(false);
        } catch (err) {
            setError('Failed to remove from favorites. Please try again.' + err.message);
            setIsSaved(true);
        }
    };

    return (
        <>
            {
                isSaved && 
                <>
                    <button 
                        onClick={userId ? handleClick : () => navigate('/login')} 
                        className="bg-red-500 px-4 py-2 rounded 'bg-red-500 hover:bg-red-700 text-white">
                        Remove from Favorites
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </>
            }
        </>
    );
}