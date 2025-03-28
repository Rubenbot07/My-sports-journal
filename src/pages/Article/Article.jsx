import Articles from '../../mock-data/sports-articles.json';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
export const Article = () => {
    const auth = useAuth()
    console.log(auth.role === 'admin')
    const { articleId } = useParams();
    const currentArticle = Articles.find(article => article.id === parseInt(articleId));
    return (
        <section className='text-center w-5/6 mx-auto flex flex-col gap-8'>
            <h1 className='text-2xl font-bold bg-blue-500'>{currentArticle.title}</h1>
            <p className='bg-gray-300 p-4 text-lg'>{currentArticle.content}</p>
            
            <h3 className='font-bold underline'>
                <Link to={`/authors/${currentArticle.author}`}>
                    {currentArticle.author}
                </Link>
            </h3>
            <button onClick={() => auth.addFavorite(currentArticle.id)} className='bg-blue-500 text-white p-2 rounded-lg'>Add To Favorites</button>

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