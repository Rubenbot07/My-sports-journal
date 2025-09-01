import { ArticleLink } from '../../components/ArticleLink';
import { ArticleAside } from '../../components/ArticleAside';
import { Link } from 'react-router-dom';
import { useArticleStore } from '@/stores/articleStore';
import { useArticlesList } from '@/hooks/useArticlesList';
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
                    <picture className='col-span-3 overflow-hidden relative rounded-xl'>
                        <Link to={`/articles/${mainArticle?.id}`}>
                            <picture>
                                <source media="(min-width: 1024px)" srcSet={`${mainArticle?.media.find((img) => img.role === 'banner')?.url}`} />
                                <source media="(min-width: 640px)" srcSet={`${mainArticle?.media.find((img) => img.role === 'cover')?.url}`} />
                                <source media="(max-width: 639px)" srcSet={`${mainArticle?.media.find((img) => img.role === 'thumbnail')?.url}`} />
                                <img src={mainArticle?.media.find((img) => img.role === 'thumbnail')} alt={mainArticle?.title} className='w-full h-full md:object-cover hover:scale-105 transition-all duration-500 ' />
                            </picture>
                            <div className='absolute bg-blue-800/60 bottom-0 left-0 p-2 text-center text-lg md:text-3xl md:p-4 text-white font-bold w-full'>
                                <h2 className=''>{mainArticle?.title}</h2>
                            </div>
                        </Link>
                    </picture>
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