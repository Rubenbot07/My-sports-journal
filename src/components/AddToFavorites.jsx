import { useBookmarks } from "@/hooks/useBookmarks";
import { useState } from "react";
import { useNavigate } from "react-router";

export const AddToFavorites = ({ articleId, userId, isSaved, setIsSaved }) => {
    const { handleSaveBookmark } = useBookmarks();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await handleSaveBookmark(userId, articleId);
            setIsSaved(true);
        } catch (err) {
            setError('Failed to save to favorites. Please try again.' + err.message);
            setIsSaved(false);
        }
    };

    return (
        <> 
        {
            !isSaved &&
            <>
                <button 
                    onClick={userId ? handleClick : () => navigate('/login')} 
                    disabled={isSaved} 
                    className={`px-4 py-2 rounded ${isSaved ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}>
                    Add to Favorites
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </> 
        }
        </>
    );
}