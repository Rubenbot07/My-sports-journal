import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/UserContext'
import { ArticlesGalleryLayout } from '../../components/ArticlesGalleryLayout'
export const Author = () => {
    const { authorId } = useParams();
    const { articles } = useAuth();    
    const authorArticles = articles.filter(article => article.author === authorId);
    return (
        <ArticlesGalleryLayout title={`Articles by ${authorId}`} articles={authorArticles} />
    )
}