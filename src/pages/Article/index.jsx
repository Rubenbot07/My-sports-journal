import { useParams, Link } from 'react-router-dom';
import { ArticleHandler } from '@/components/articles/ArticleHandler';
import { CommentContainer } from '@/components/comments/CommentContainer';
import { ArticleAside } from '@/components/articles/ArticleAside';
import { useArticleId } from '@/hooks/useArticleId';
import { useArticleStore } from '@/stores/articleStore';
import { ActionButtonsContainer } from '@/components/ui/ActionButtonsContainer';
import { useUserStore } from '@/stores/userStore';
import { ArticleHeroImage } from '@/components/articles/ArticleHeroImage';
import { ArticleHeader } from '@/components/articles/ArticleHeader';
import { ArticleContent } from '@/components/articles/ArticleContent';
export const Article = () => {
    const user = useUserStore((state) => state.user);
    const roles = useUserStore((state) => state.roles).map(r => r.name);
    const { articleId } = useParams();
    const { loading, error } = useArticleId(articleId);
    const { article, removeArticle } = useArticleStore();

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading article: {error.message}</h1>;
    return (
        <section className='text-center w-full mx-auto flex flex-col gap-8 max-w-[1500px]'>
            <ArticleHeader article={article} />
            <section className='grid grid-cols-1 lg:grid-cols-4 lg:max-w-[1500px] w-full py-4 gap-y-8 lg:gap-x-8  min-[300px] h-auto mx-auto'>
                <ArticleHeroImage article={article} />
                <ArticleAside categoryId={article?.categories.id} articleId={article?.id} />
            </section>
            <section>
                <ActionButtonsContainer article={article} userId={user?.id} />
            </section>
            <section className='grid grid-cols-1 lg:grid-cols-4 w-full lg:max-w-[1500px] py-4 gap-y-8 lg:gap-x-8  min-[300px] h-auto mx-auto'>
                <ArticleContent content={article?.content_markdown} />
                <CommentContainer articleId={article?.id} />
                <ArticleHandler articleId={article?.id} roles={roles} userId={user?.id} setRemoveArticle={removeArticle} />
                
            </section>
        </section>
    )
} 
