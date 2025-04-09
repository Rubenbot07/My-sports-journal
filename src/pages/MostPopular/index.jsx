import { Link } from 'react-router-dom';
import Articles from '../../mock-data/sports-articles.json';
import { ArticleOfCategories } from '../../components/ArticleOfCategories';
import Background from '../../assets/sportsJournalLogo.png';
export const MostPopular = () => {
    const mostPopularArticles = [...Articles.slice(0, 6 )];
    return (
        <section className='grid grid-cols-1 2sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full max-w-[1500px] mx-auto'>
            <h1
                className={`relative font-bold text-4xl text-white col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 h-20 flex items-center justify-center bg-[url("https://t3.ftcdn.net/jpg/02/71/29/58/360_F_271295864_yiioni2LZXAkdVUs1EP6GdR680QR7iKv.jpg")] bg-cover bg-center`}>
                    Most Popular
            </h1>
            {
                mostPopularArticles.map((article) => (
                    <ArticleOfCategories  key={article.id} article={article}/>
                ))
            }

        </section>
    )
}