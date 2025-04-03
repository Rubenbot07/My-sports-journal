import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import { Comment } from '../../components/Comment';
export const Article = () => {
    const auth = useAuth()
    const { articleId } = useParams();
    const currentArticle = auth.articles[articleId - 1];
    const handleComment = (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        if (comment) {
            auth.addComment(currentArticle.id, comment, auth.user, new Date().toLocaleDateString());
            // auth.addComment(currentArticle.id, comment);
            e.target.comment.value = '';
        }
    }
    return (
        <section className='text-center w-5/6 mx-auto flex flex-col gap-8'>
            <h1 className='text-2xl font-bold bg-blue-500'>{currentArticle.title}</h1>
            <p className='bg-gray-300 p-4 text-lg'>{currentArticle.content}</p>
            
            <h3 className='font-bold underline'>
                <Link to={`/authors/${currentArticle.author}`}>
                    {currentArticle.author}
                </Link>
            </h3>
            <div>
                <h2 className='text-xl font-bold'>Comments</h2>
                {currentArticle.comments?.map(comment => (
                    <div key={comment.id} className='flex flex-col gap-2'>
                        <Comment auth={auth} comment={comment.content} commentId={comment.id} articleId={currentArticle.id} userName={comment.userName} />
                    </div>
                ))}
                {
                    auth.user ? (
                        <form
                            onSubmit={(e) => {handleComment(e)}
                            }
                            className='flex flex-col gap-2'
                        >
                            <input
                                type='text'
                                name='comment'
                                placeholder='Add a comment...'
                                className='border border-blue-500 p-2 rounded-lg'
                            />
                            <button
                                type='submit'
                                className='bg-blue-500 text-white p-2 rounded-lg'
                            >
                                Submit
                            </button>
                        </form>
                    ) : (
                        <Link to='/login'>
                            <button className='text-red-500 border border-red-500 p-2 rounded-lg'>Log In To Leave A Comment</button>
                        </Link>
                    )
                }
            </div>
            {
                auth.favorites.some(favorite => favorite.id === currentArticle.id) ? (
                    <button onClick={() => auth.handleFavorites(currentArticle.id)} className='bg-red-500 text-white p-2 rounded-lg'>Remove From Favorites</button>
                )  : (
                    <button onClick={() => auth.handleFavorites(currentArticle.id)} className='bg-blue-500 text-white p-2 rounded-lg'>Add To Favorites</button>
                )
            }

            {
                auth?.role === 'admin' && (
                    <>
                        <button
                            onClick={() => auth.deleteArticle(currentArticle.id)}
                            className='bg-red-500 text-white p-2 rounded-lg'
                        >
                            Delete
                        </button>
                        <button className='bg-green-500 text-white p-2 rounded-lg'>
                            <Link to={`/articles/edit/${currentArticle.id}`}>
                                Edit
                            </Link>
                        </button>
                    </>
                )
            }
            {
                auth?.role === 'editor' && (
                    <>
                        <button className='bg-green-500 text-white p-2 rounded-lg'>
                            Edit
                        </button>
                    </>
                )
            }
        </section>
    )
} 