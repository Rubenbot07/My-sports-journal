import { useParams, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/UserContext';
import { Comment } from '../../components/Comment';
import { ArticleAside } from '../../components/ArticleAside';
export const Article = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const auth = useAuth()
    const location = useLocation();
    const { articleId } = useParams();
    const currentArticle = auth.articles?.find(article => article.id === parseInt(articleId));
    const related = auth.articles?.filter(article => article.category === currentArticle?.category);
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

    return (
        <section className='text-center w-full mx-auto flex flex-col gap-8 max-w-[1500px]'>
            <h3 className='bg-gray-300 p-2 w-fit rounded-sm border-l-4 border-l-primary cursor-pointer'>
                <Link to={`/category/${currentArticle?.category}`} >{currentArticle?.category} <span className='text-primary font-bold'>/</span> {currentArticle?.publishedDate}</Link>
            </h3>
            <i className='flex gap-2 text-lg text-start text-gray-500'>
                By
                <Link to={`/authors/${currentArticle?.author}`} className='underline font-bold'>
                    {currentArticle?.author}
                </Link>
                Sport Journal
            </i>
            <h1
                className={`relative font-bold text-4xl text-white col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 h-20 flex items-center justify-center bg-[url("https://t3.ftcdn.net/jpg/02/71/29/58/360_F_271295864_yiioni2LZXAkdVUs1EP6GdR680QR7iKv.jpg")] bg-cover bg-center`}>
                    {currentArticle?.title}
            </h1>
            <section className='grid grid-cols-1 lg:grid-cols-4 lg:max-w-[1500px] w-full py-4 gap-y-8 lg:gap-x-8  min-[300px] h-auto mx-auto'>
                    <picture className={`col-span-3 overflow-hidden relative rounded-xl ${isImageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                        <img 
                            src={currentArticle?.image}
                            alt={currentArticle?.title} 
                            onLoad={handleImageLoad}
                            className='w-full h-full md:object-cover object-fill' />
                    </picture>
                <ArticleAside articles={related} title='Related' paragraph='Check out related articles' quantity={3} />
            </section>
            <section className='grid grid-cols-1 lg:grid-cols-4 w-full lg:max-w-[1500px] py-4 gap-y-8 lg:gap-x-8  min-[300px] h-auto mx-auto'>
                <div className='col-span-3 overflow-hidden relative rounded-xl'>
                    <p className=' p-4 text-lg whitespace-pre-line text-justify'>
                        {currentArticle?.content}
                    </p>           
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
                    {
                        auth.favorites.some(favorite => favorite.id === currentArticle?.id) ? (
                            <button onClick={() => auth.handleFavorites(currentArticle?.id)} className='bg-primary cursor-pointer text-white p-2 rounded-lg min-w-32 max-w-56' >Remove From Favorites</button>
                        )  : (
                            <button onClick={() => auth.handleFavorites(currentArticle?.id)} className='bg-primary cursor-pointer text-white p-2 rounded-lg min-w-32 max-w-56'>Add To Favorites</button>
                        )
                    }
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
