import { Link } from 'react-router-dom';
import { ArticleLink } from '../../components/ArticleLink';
import Articles from '../../mock-data/sports-articles.json';
export const MostPopular = () => {
    const mostPopularArticles = [...Articles.slice(0, 6 )];
    return (
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full max-w-[1500px] mx-auto'>
            <h1 className='font-bold  text-4xl text-red-500 lg:col-span-2 p-4'>Most Popular</h1>
            {
                mostPopularArticles.map((article) => (
                    <Link to={`/articles/${article.id}`} key={article.id}>
                        <article className='relative flex flex-col md:flex-row max-w-[500px] md:max-w-none mx-auto gap-4 bg-gray-200 p-4 rounded-lg shadow-md'>
                            <div className='w-full md:w-2/4 md:min-w-70 rounded-2xl overflow-hidden md:h-[200px]'>
                                <img className='w-full h-full object-cover' src={article.image} alt={article.title} />
                            </div>
                            <div className='flex flex-col w-2/4 text-start gap-3 pt-4'>
                                <h2 className='text-md'>{article.publishedDate}</h2>
                                <h3 className='font-bold text-lg'>{article.title}</h3>
                                <p className='hidden md:block'>{article.content.split(' ').slice(0, 20).join(' ')}...</p>
                                <div className='absolute bg-red-500 text-white w-32 rounded-tr-lg top-0 right-0 px-1 text-center font-bold'>{article.category}</div>
                            </div>
                        </article>
                    </Link>
                ))
            }

        </section>
    )
}