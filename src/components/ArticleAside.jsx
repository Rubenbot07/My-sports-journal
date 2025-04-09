import { Link } from 'react-router-dom';
export const ArticleAside = ({ articles }) => {
    return (
                        <aside className='h-full w-full bg-gray-200 p-4 rounded-lg shadow-md flex flex-col gap-4'>
                            <h2 className='text-center text-xl md:text-2xl font-bold'>Latest Articles</h2>
                            <p className='text-center text-gray-500'>Check out our latest articles on various topics!</p>
                            <div className='flex lg:gap-4 gap-2 justify-center lg:flex-col md:flex-row md:flex-wrap flex-col'>
                                {articles.slice(0, 5).map((article) => (
                                    <Link to={`/articles/${article.id}`} key={article.id}>
                                        <div 
                                            className=' bg-white border-1 border-l-8 border-l-primary border-gray-300 rounded-lg p-2 lg:p-4 hover:bg-gray-100 transition duration-300 cursor-pointer shadow-md'
                                        >
                                            <h3 className='text-md md:text-lg font-bold'>{article.title}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </aside>
    )
}