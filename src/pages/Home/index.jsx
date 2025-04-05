import { ArticleLink } from '../../components/ArticleLink';
import { useAuth } from '../../context/UserContext';
import { ArticleAside } from '../../components/ArticleAside';
import { Link } from 'react-router-dom';
export const Home = () => {
    const { articles } = useAuth()
    const topTwelveArticles = articles.slice(0, 11)
    return (
        <div className='flex flex-col gap-10 w-full '>
            <section className='grid grid-cols-1 lg:grid-cols-4 w-full lg:max-w-[1500px] py-4 gap-y-8 lg:gap-x-8  min-[300px] h-auto mx-auto'>
                    <picture className='col-span-3 overflow-hidden relative rounded-xl'>
                        <Link to={`/articles/${articles[5].id}`}>
                            <img src={articles[5].image} alt={articles[5].title} className='w-full h-full md:object-cover object-fill' />
                            <div className='absolute bottom-0 left-0 bg-gray-700/70 p-2 text-center text-lg md:text-3xl md:p-4 text-white font-bold'>
                                <h2 className=''>{articles[5].title}</h2>
                            </div>
                        </Link>
                    </picture>
                <ArticleAside articles={articles}/>
            </section>
            <section className='grid xs:grid-cols-1 2sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full  min-[300px] lg:max-w-[1500px] mx-auto'>
                {topTwelveArticles.map((article, index) => (               
                    <ArticleLink key={article.id} article={article} isThird={index === 2}></ArticleLink>
                ))}
            </section>
        </div>
    )
}