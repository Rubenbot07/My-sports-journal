import { useParams } from "react-router-dom"
import { UploadArticleImagesFrom } from "@/components/articles/forms/UploadArticleImagesFrom"
import { useArticleId } from "@/hooks/useArticleId"
import { useArticleStore } from "@/stores/articleStore"
export const UploadImages = () => {
    const { articleId: id } = useParams()
    const article = useArticleStore((state) => state.article);
    const { loading, error } = useArticleId(id, 'in_review');
    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading article: {error.message}</h1>;
    return (
        <>
            <UploadArticleImagesFrom  articleId={id} articleSlug={article?.slug} category={article?.categories.slug}/>
        </>
    )
}