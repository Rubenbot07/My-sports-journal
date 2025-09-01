import { useBookmarks } from "@/hooks/useBookmarks";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useNavigate } from "react-router";

export const AddToFavorites = ({ articleId }) => {
    const { handleSaveBookmark } = useBookmarks();
    const [isSaved, setIsSaved] = useState(false);
    const [error, setError] = useState(null);
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();


    const handleClick = async () => {
        try {
            await handleSaveBookmark(user?.id, articleId);
            setIsSaved(true);
        } catch (err) {
            setError('Failed to save to favorites. Please try again.' + err.message);
            setIsSaved(false);
        }
    };

    return (
        <>
            <button 
                onClick={user ? handleClick : () => navigate('/login')} 
                disabled={isSaved} 
                className={`px-4 py-2 rounded ${isSaved ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}>
                {isSaved ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
    );
}