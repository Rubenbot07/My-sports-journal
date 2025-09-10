import { useParams } from 'react-router-dom'
import { useAuthors } from '@/hooks/useAuthors';
import { ArticlesGalleryLayout } from '@/components/ArticlesGalleryLayout'
export const Author = () => {
    const { authorId } = useParams();
    const id = authorId.split('|')[0];
    const name = authorId.split('|')[1];
    const { data, error, loading } = useAuthors(id);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading articles: {error.message}</h1>;
    return (
        <>
            <ArticlesGalleryLayout title={`Articles by ${name}`} articles={data} />
        </>
    )
}