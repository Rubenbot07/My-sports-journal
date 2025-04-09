import { Link } from 'react-router-dom'
export const ArticleLink = ({ article, isThird }) => {
    return (
        <article className={`relative border border-gray-300 w-full h-full flex flex-col bg-gray-200 rounded-lg shadow-md  text-start ${isThird ? 'pb-0 lg:row-span-2 lg:col-span-2 row-start-1 lg:col-start-2 lg:row-start-1 2sm:col-span-2' : 'pb-4'}`}>
            <Link to={`/articles/${article.id}`}>
                <div className={`overflow-hidden rounded-t-lg h-[200px] relative ${isThird ? 'lg:h-[300px]' : ''} transition-all duration-500`}>
                    <img className='w-full h-full object-top object-cover'  src={article.image} alt={article.title} />
                    <div className='absolute w-32 top-0 right-0 px-1 text-center text-md text-white bg-primary font-bold'>{article.category}</div>
                </div>
                <h2 className='font-bold p-2 text-xl'>{article.title}</h2>
                {
                    isThird && (
                        <>              
                            <div className='hidden lg:flex lg:flex-col gap-8 p-3'>
                                <p className='text-black'>{article.content.slice(0, 400)}...</p>
                            </div>
                            <i className='sm:absolute flex bottom-0 right-0 text-2xl md:w-2/4 text-center bg-primary text-white p-2 font-bold rounded-bl-lg sm:rounded-tl-lg sm:rounded-bl-none rounded-br-lg'>Most Read</i>
                        </>
                    )
                }
            </Link>
        </article>
    )
}