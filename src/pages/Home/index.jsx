import { ArticleLink } from '../../components/ArticleLink';
import { useAuth } from '../../context/UserContext';
import { ArticleAside } from '../../components/ArticleAside';
import { Link } from 'react-router-dom';
export const Home = () => {
    const { articles } = useAuth()
    return (
        <div>
            <section className='grid grid-cols-1 lg:grid-cols-4 w-full lg:max-w-[1500px] py-4 gap-y-8 lg:gap-x-8  min-[300px] h-auto mx-auto'>
                    <picture className='col-span-3 overflow-hidden relative rounded-xl'>
                        <Link to={`/articles/${articles[5].id}`}>
                            <img src={articles[5].image} alt={articles[5].title} className='w-full h-full object-cover' />
                            <div className='absolute bottom-0 left-0 bg-gray-700/70 p-2 text-center text-lg md:text-3xl md:p-4 text-white font-bold'>
                                <h2 className=''>{articles[5].title}</h2>
                            </div>
                        </Link>
                    </picture>
                <ArticleAside articles={articles}/>
            </section>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-3/4 min-[300px] md:max-w-[1000px] mx-auto'>
                {articles.map((article) => (               
                    <ArticleLink key={article.id} article={article}></ArticleLink>
                ))}
            </section>
        </div>
    )
}