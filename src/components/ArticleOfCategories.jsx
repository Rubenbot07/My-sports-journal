import { Link } from 'react-router-dom'
export const ArticleOfCategories = ({ article }) => {
    return (
        <Link to={`/articles/${article.id}`} >
            <article className='relative flex flex-col md:flex-row max-w-[500px] md:max-w-none mx-auto gap-4 bg-gray-200 p-4 rounded-lg shadow-md'>
                <div className='w-full md:w-2/4 md:min-w-70 rounded-2xl overflow-hidden h-[200px]'>
                    <img className='w-full h-full object-top object-cover' src={article.image} alt={article.title} />
                </div>
                <div className='flex flex-col md:w-2/4 text-start gap-2 pt-4 overflow-hidden'>
                    <h2 className='text-md'>{article.publishedDate}</h2>
                    <h3 className='font-bold text-lg text-nowrap truncate'>{article.title}</h3>
                    <p className='hidden md:block'>{article.content.split(' ').slice(0, 20).join(' ')}...</p>
                </div>
            </article>
        </Link>
    )
}