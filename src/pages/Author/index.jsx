import { useParams } from 'react-router-dom'
import Articles from '../../mock-data/sports-articles.json';
import { ArticleLink } from '../../components/ArticleLink';
export const Author = () => {
    const { authorId } = useParams();    
    const authorArticles = Articles.filter(article => article.author === authorId);
    return (
        <section className='text-center w-5/6 mx-auto flex flex-col gap-8'>
            <h1 className='text-2xl font-bold bg-blue-500'>Author</h1>
            <p className='bg-gray-300 p-4 text-lg'>{authorId}</p>
            {
                authorArticles.map(article => (
                    <ArticleLink key={article.id} article={article} />
                ))
            }
        </section>
    )
}