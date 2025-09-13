import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArticleHandler } from '@/components/ArticleHandler';
import { CommentContainer } from '@/components/CommentContainer';
import { ArticleAside } from '@/components/ArticleAside';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { useArticleId } from '@/hooks/useArticleId';
import { useArticleStore } from '@/stores/articleStore';
import { ActionButtonsContainer } from '@/components/ActionButtonsContainer';
import { useUserStore } from '@/stores/userStore';
export const Article = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const user = useUserStore((state) => state.user);
    const roles = useUserStore((state) => state.roles).map(r => r.name);
    const { articleId } = useParams();
    const { loading, error } = useArticleId(articleId);
    const { article, removeArticle } = useArticleStore();

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading article: {error.message}</h1>;

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading article: {error.message}</h1>;
    return (
        <section className='text-center w-full mx-auto flex flex-col gap-8 max-w-[1500px]'>
            <h3 className='bg-gray-300 p-2 w-fit rounded-sm border-l-4 border-l-primary cursor-pointer'>
                <Link to={`/category/${article?.categories.slug}`} >{article?.categories.name} <span className='text-primary font-bold'>/</span> {new Date(article?.published_at).toLocaleDateString()}</Link>
            </h3>
            <i className='flex gap-2 text-lg text-start text-gray-500'>
                By
                <Link to={`/authors/${article?.profiles.id}|${article?.profiles.display_name}`} className='underline font-bold'>
                    {article?.profiles.display_name}
                </Link>
                Sport Journal
            </i>
            <h1
                className={`relative font-bold text-4xl text-white col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 min-h-20 flex items-center justify-center bg-[url("https://t3.ftcdn.net/jpg/02/71/29/58/360_F_271295864_yiioni2LZXAkdVUs1EP6GdR680QR7iKv.jpg")] bg-cover bg-center`}>
                    {article?.title}
            </h1>
            <section className='grid grid-cols-1 lg:grid-cols-4 lg:max-w-[1500px] w-full py-4 gap-y-8 lg:gap-x-8  min-[300px] h-auto mx-auto'>
                    <picture className={`col-span-3 overflow-hidden relative rounded-xl ${isImageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                        <source media="(min-width: 1024px)" srcSet={`${article?.media.find((img) => img.role === 'banner')?.url}`} />
                                <source media="(min-width: 640px)" srcSet={`${article?.media.find((img) => img.role === 'cover')?.url}`} />
                                <source media="(max-width: 639px)" srcSet={`${article?.media.find((img) => img.role === 'thumbnail')?.url}`} />
                        <img 
                            src={article?.media.find((img) => img.role === 'thumbnail')?.url}
                            alt={article?.title} 
                            onLoad={handleImageLoad}
                            className='w-full h-full md:object-cover object-fill' />
                    </picture>
                <ArticleAside categoryId={article?.categories.id} articleId={article?.id} />
            </section>
            <section>
                <ActionButtonsContainer article={article} userId={user?.id} />
            </section>
            <section className='grid grid-cols-1 lg:grid-cols-4 w-full lg:max-w-[1500px] py-4 gap-y-8 lg:gap-x-8  min-[300px] h-auto mx-auto'>
                <div className='col-span-3 overflow-hidden relative rounded-xl'>
                    <div className=' p-4 text-lg whitespace-pre-line text-justify'>
                        <MarkdownRenderer content={article?.content_markdown}/>
                    </div>           
                </div>
                <CommentContainer articleId={article?.id} />
                <ArticleHandler articleId={article?.id} roles={roles} userId={user?.id} setRemoveArticle={removeArticle} />
                
            </section>
        </section>
    )
} 
