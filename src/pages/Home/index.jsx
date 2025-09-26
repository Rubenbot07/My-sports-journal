import { ArticleLink } from '@/components/articles/ArticleLink';
import { ArticleAside } from '@/components/articles/ArticleAside';
import { Link } from 'react-router-dom';
import { useArticleStore } from '@/stores/articleStore';
import { useArticlesList } from '@/hooks/useArticlesList';
import { ArticleHeroImage } from '@/components/articles/ArticleHeroImage';
export const Home = () => {
    const { articles } = useArticleStore();
    const { loading } = useArticlesList(12)
    const mainArticle = articles[0];
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='flex flex-col gap-10 w-full '>
            <section className='grid grid-cols-1 lg:grid-cols-4 w-full lg:max-w-[1500px] py-4 gap-y-8 lg:gap-x-8  min-[300px] h-auto mx-auto'>
                    <div className='col-span-3 overflow-hidden relative rounded-xl'>
                        <Link to={`/articles/${mainArticle?.id}`}>
                            <ArticleHeroImage article={mainArticle} title={true}/>
                        </Link>
                    </div>
                <ArticleAside categoryId={mainArticle?.categories?.id} articleId={mainArticle?.id}/>
            </section>
            <section className='grid xs:grid-cols-1 2sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full  min-[300px] lg:max-w-[1500px] mx-auto'>
                {articles.slice(1).map((article, index) => (               
                    <ArticleLink key={article.id} article={article} isThird={index === 2}></ArticleLink>
                ))}
            </section>
        </div>
    )
}