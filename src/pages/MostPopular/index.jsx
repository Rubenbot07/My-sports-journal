import { useAuth } from '../../context/UserContext';
import { ArticlesGalleryLayout } from '../../components/ArticlesGalleryLayout';
export const MostPopular = () => {
    const { articles } = useAuth();
    const mostPopularArticles = [...articles.slice(0, 6 )];
    return (
        <ArticlesGalleryLayout title='Most Popular' articles={mostPopularArticles} />
    )
}