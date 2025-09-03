import { ArticlesGalleryLayout } from "../../components/ArticlesGalleryLayout"
import { useBookmarks } from "@/hooks/useBookmarks"
import { useUserStore } from "@/stores/userStore"
import { useEffect, useState } from "react"


export const Favorites = () => {
    const user = useUserStore((state) => state.user);
    const { getBookmarsByUserId } = useBookmarks();

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                const bookmarks = await getBookmarsByUserId(user.id);
                setFavorites(bookmarks || []);
            }
        };
        fetchFavorites();
    }, [user, getBookmarsByUserId]);


    return (
        <ArticlesGalleryLayout title='Favorites' articles={favorites} />
    )
}