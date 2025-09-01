import { useBookmarks } from "@/hooks/useBookmarks";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useNavigate } from "react-router";

export const RemoveFromFavorites = ({ articleId }) => {
    const { handleRemoveBookmark } = useBookmarks();
    const [isRemoved, setIsRemoved] = useState(false);
    const [error, setError] = useState(null);
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await handleRemoveBookmark(user?.id, articleId);
            setIsRemoved(true);
        } catch (err) {
            setError('Failed to remove from favorites. Please try again.' + err.message);
            setIsRemoved(false);
        }
    };

    return (
        <>
            <button 
                onClick={user ? handleClick : () => navigate('/login')} 
                disabled={isRemoved} 
                className={`px-4 py-2 rounded ${isRemoved ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700 text-white'}`}>
                {isRemoved ? 'Add to Favorites' : 'Remove from Favorites'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
    );
}