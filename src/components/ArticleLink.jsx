import { Link } from 'react-router-dom'
import { ThumbnailContainer } from './thumbnailContainer'
export const ArticleLink = ({ article, isThird }) => {
    const cover = article?.media.find((img) => img.role === "cover");
    const thumb = article?.media.find((img) => img.role === "thumbnail");
    return (
        <article className={`relative border border-gray-300 w-full h-full flex flex-col bg-gray-200 rounded-lg shadow-md  text-start hover:bg-gray-300 ${isThird ? 'pb-0 lg:row-span-2 lg:col-span-2 row-start-1 lg:col-start-2 lg:row-start-1 2sm:col-span-2' : 'pb-4'}`}>
            <Link to={`/articles/${article.id}`}>
                <div className={`overflow-hidden rounded-t-lg h-[200px] relative aspect-auto ${isThird ?  'md:h-[400px]' : ''} transition-all duration-500`} >
                    <picture>
                        <source media="(min-width: 640px)" srcSet={cover?.url} />
                        <source media="(max-width: 639px)" srcSet={thumb?.url} />
                        <img loading='lazy' src={thumb?.url} className='w-full h-full object-top object-cover hover:scale-105 transition-all duration-500 ' alt={article.title} />
                    </picture>
                    <div className='absolute w-32 top-0 right-0 px-1 text-center text-md text-white bg-primary font-bold'>{article.category}</div>
                </div>
                <h2 className={`font-bold p-2 text-xl ${isThird ? 'lg:text-3xl' : ''}`}>{article.title}</h2>
                {
                    isThird && (
                        <>              
                            <div className='hidden lg:flex lg:flex-col gap-8 p-3 '>
                                <p className='text-black'>{article.excerpt}</p>
                            </div>
                            <i className='sm:absolute flex bottom-0 right-0 text-2xl md:w-1/4 text-center bg-primary text-white p-2 font-bold rounded-bl-lg sm:rounded-tl-lg sm:rounded-bl-none rounded-br-lg'>Most Read</i>
                        </>
                    )
                }
            </Link>
        </article>
    )
}