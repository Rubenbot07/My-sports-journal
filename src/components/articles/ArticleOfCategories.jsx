import { Link } from 'react-router-dom'
import { ThumbnailContainer } from '@/components/ui/thumbnailContainer'
export const ArticleOfCategories = ({ article, isSingle }) => {
    return (
        <Link to={`/articles/${article.id}`} >
            <article className='relative flex flex-col gap-x-2 md:flex-row  md:max-w-none mx-auto bg-gray-200 p-3 rounded-lg shadow-md hover:bg-gray-300'>
                <ThumbnailContainer article={article} isSingle={isSingle} />
                <div className='flex flex-col md:w-2/4 text-start gap-2 pt-4 overflow-hidden'>
                    <h3 className='font-bold text-lg text-nowrap truncate'>{article.title}</h3>
                    <p className='text-sm md:text-md line-clamp-4'>{article.excerpt}</p>
                </div>
            </article>
        </Link>
    )
}