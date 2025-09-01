import { useParams, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/context/UserContext';
import { Comment } from '@/components/Comment';
import { ArticleAside } from '@/components/ArticleAside';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { useArticleId } from '@/hooks/useArticleId';
import { useArticleStore } from '@/stores/articleStore';
import { AddToFavorites } from '@/components/addToFavorites';
import { RemoveFromFavorites } from '@/components/removeFromFavorites';
export const Article = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const auth = useAuth()
    const location = useLocation();
    const { articleId } = useParams();
    const { loading, error } = useArticleId(articleId);
    const { article } = useArticleStore();
    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading article: {error.message}</h1>;
  const currentArticle = auth.articles?.find(article => article.id === parseInt(articleId));
  const handleComment = (e) => {
      e.preventDefault();
      const comment = e.target.comment.value;
      if (comment) {
          auth.addComment(currentArticle?.id, comment, auth.user, new Date().toLocaleDateString());
          e.target.comment.value = '';
        }
    }
    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };
    if(!article) {
        return <h1>Loading...</h1>
    }
    return (
        <section className='text-center w-full mx-auto flex flex-col gap-8 max-w-[1500px]'>
            <h3 className='bg-gray-300 p-2 w-fit rounded-sm border-l-4 border-l-primary cursor-pointer'>
                <Link to={`/category/${article?.categories.slug}`} >{article?.categories.name} <span className='text-primary font-bold'>/</span> {new Date(article?.published_at).toLocaleDateString()}</Link>
            </h3>
            <i className='flex gap-2 text-lg text-start text-gray-500'>
                By
                <Link to={`/authors/${article?.profiles.display_name}`} className='underline font-bold'>
                    {article?.profiles.display_name}
                </Link>
                Sport Journal
            </i>
            <h1
                className={`relative font-bold text-4xl text-white col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 h-20 flex items-center justify-center bg-[url("https://t3.ftcdn.net/jpg/02/71/29/58/360_F_271295864_yiioni2LZXAkdVUs1EP6GdR680QR7iKv.jpg")] bg-cover bg-center`}>
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
            <section className='grid grid-cols-1 lg:grid-cols-4 w-full lg:max-w-[1500px] py-4 gap-y-8 lg:gap-x-8  min-[300px] h-auto mx-auto'>
                <div className='col-span-3 overflow-hidden relative rounded-xl'>
                    <div className=' p-4 text-lg whitespace-pre-line text-justify'>
                        <MarkdownRenderer content={article?.content_markdown}/>
                    </div>           
                </div>
                <div className='col-span-3 lg:col-span-1 flex flex-col gap-4 bg-gray-200 h-fit lg:max-h-[800px] lg:overflow-scroll  p-4 rounded-lg'>
                    <h2 className='text-xl font-bold'>Comments</h2>
                    {currentArticle?.comments?.map(comment => (
                        <div key={comment.id} className='flex flex-col gap-2 bg-white p-2 rounded-lg '>
                            <Comment auth={auth} comment={comment.content} commentId={comment.id} articleId={currentArticle?.id} userName={comment.userName} />
                        </div>
                    ))}
                    {
                        auth.user ? (
                            <form
                                onSubmit={(e) => {handleComment(e)}
                                }
                                className='flex flex-col gap-2'
                            >
                                <div className='flex justify-between gap-1 border border-gray-300 rounded-lg p-2 bg-white'>
                                    <input
                                        type='text'
                                        name='comment'
                                        placeholder='Add a comment...'
                                        className='w-full outline-none'
                                    />
                                    <button
                                        type='submit'
                                        className='text-primary'
                                    >
                                        Post
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <Link to='/login' state={{ from: location }} className='sticky bottom-0'>
                                <button className='text-white bg-primary p-2 rounded-lg'>Log In To Leave A Comment</button>
                            </Link>
                        )
                    }
                </div>
                <div className='flex flex-col 2sm:col-span-3 p-4 gap-4 w-full  2sm:flex-row justify-center md:justify-start items-start'>
                    <div className='w-full flex justify-center md:justify-start'>
                        <AddToFavorites articleId={article?.id} />
                        <RemoveFromFavorites articleId={article?.id} />
                    </div>
                    {
                        auth?.role === 'admin' && (
                            <>
                                <button
                                    onClick={() => auth.deleteArticle(currentArticle?.id)}
                                    className='bg-primary cursor-pointer text-white p-2 rounded-lg min-w-32 max-w-56'
                                >
                                    Delete
                                </button>
                                <button className='bg-primary cursor-pointer text-white p-2 rounded-lg min-w-32 max-w-56'>
                                    <Link to={`/articles/edit/${currentArticle?.id}`}>
                                        Edit
                                    </Link>
                                </button>
                            </>
                        )
                    }
                    {
                        auth?.role === 'editor' && (
                            <>
                                <button className='bg-primary cursor-pointer text-white p-2 rounded-lg'>
                                    Edit
                                </button>
                            </>
                        )
                    }
                </div>
            </section>

        </section>
    )
} 
