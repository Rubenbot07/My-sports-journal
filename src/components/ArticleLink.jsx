import { Link } from 'react-router-dom'
export const ArticleLink = ({ article }) => {
    return (
        <article className="border border-gray-300 p-4 mb-4 w-5/6 mx-auto">
            <Link to={`/articles/${article.id}`}>
                <h2 className='font-bold bg-blue-500'>{article.title}</h2>
                <p>
                    {article.author}
                </p>
                <p>{article.publishedDate}</p>
            </Link>
        </article>
    )
}