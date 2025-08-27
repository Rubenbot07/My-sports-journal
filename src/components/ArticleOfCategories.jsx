import { Link } from 'react-router-dom'
export const ArticleOfCategories = ({ article, isSingle }) => {
    return (
        <Link to={`/articles/${article.id}`} >
            <article className='relative flex flex-col md:flex-row max-w-[500px] md:max-w-none mx-auto gap-4 bg-gray-200 p-4 rounded-lg shadow-md hover:bg-gray-300'>
                <div className={`w-full md:w-2/4 md:min-w-70 rounded-2xl overflow-hidden h-[200px] ${isSingle ? 'lg:h-[300px]' : ''}`}>
                    <picture className="rounded-lg overflow-hidden md:w-2/3 lg:w-1/2 max-h-96">
                        <source media="(min-width: 1024px)" srcSet={`${article?.media.find((img) => img.role === 'banner')?.url}`} />
                                <source media="(min-width: 640px)" srcSet={`${article?.media.find((img) => img.role === 'cover')?.url}`} />
                                <source media="(max-width: 639px)" srcSet={`${article?.media.find((img) => img.role === 'thumbnail')?.url}`} />
                                <img src={article?.media.find((img) => img.role === 'thumbnail')} alt={article?.title} className='w-full h-full md:object-cover hover:scale-105 transition-all duration-500 ' />
                    </picture>
                </div>
                <div className='flex flex-col md:w-2/4 text-start gap-2 pt-4 overflow-hidden'>
                    <h2 className='text-md'>{article.publishedDate}</h2>
                    <h3 className='font-bold text-lg text-nowrap truncate'>{article.title}</h3>
                    <p className='hidden md:block'>{article.excerpt}</p>
                </div>
            </article>
        </Link>
    )
}