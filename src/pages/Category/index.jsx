import { useParams } from "react-router-dom"
import { useAuth } from "../../context/UserContext"
import { ArticleOfCategories } from "../../components/ArticleOfCategories";
export const Category = () => {
    const { category } = useParams();
    const auth = useAuth()
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)
    const categoryArticles = auth.articles.filter(article => article.category === categoryTitle)
    return (
        <section className='grid grid-cols-1 2sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full max-w-[1500px] mx-auto'>
            <h1
                className={`relative font-bold text-4xl text-white col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 h-20 flex items-center justify-center bg-[url("https://t3.ftcdn.net/jpg/02/71/29/58/360_F_271295864_yiioni2LZXAkdVUs1EP6GdR680QR7iKv.jpg")] bg-cover bg-center`}>
                {categoryTitle}
            </h1>
            <article className="col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 flex flex-col md:flex-row  bg-gray-300 p-4 rounded-lg shadow-md text-start gap-4">
                <picture className="rounded-lg overflow-hidden md:w-2/3 lg:w-1/2 max-h-96">
                    <img className="w-full h-full object-cover object-top" src={categoryArticles[0].image} alt={categoryArticles[0].title} />
                </picture>
                <div className="flex flex-col gap-2 lg:gap-4 p-2 md:w-1/3 lg:w-1/2 overflow-hidden">
                    <h2 className='text-md'>{categoryArticles[0].publishedDate}</h2>
                    <h3 className='font-bold text-lg 2sm:text-2xl md:text-3xl lg:text-5xl'>{categoryArticles[0].title}</h3>
                    <p className="md:text-lg lg:text-xl">{categoryArticles[0].content.split(' ').slice(0, 30).join(' ')}...</p>
                </div>
            </article>
            {
                categoryArticles.splice(1).map(article => (
                    <ArticleOfCategories key={article.id} article={article} />
                ))
            }
        </section>
    )
}