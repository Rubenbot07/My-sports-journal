import { useAuth } from "../../context/UserContext"
import { ArticlesGalleryLayout } from "../../components/ArticlesGalleryLayout"

export const Favorites = () => {
    const auth = useAuth()
    return (
        <ArticlesGalleryLayout title='Favorites' articles={auth.favorites} />
    )
}