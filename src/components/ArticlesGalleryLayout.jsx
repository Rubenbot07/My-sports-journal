import { ArticleOfCategories } from './ArticleOfCategories';
export const ArticlesGalleryLayout = ({ title, articles}) => {
    const isSingleArticle = articles.length === 1;
    console.log(articles);
    return (
        <section className={`grid grid-cols-1 2sm:grid-cols-2 md:grid-cols-1 ${isSingleArticle ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-4 p-4 w-full max-w-[1500px] mx-auto`}>
            <h1
                className={`relative font-bold text-4xl text-white col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 h-20 flex items-center justify-center bg-[url("https://t3.ftcdn.net/jpg/02/71/29/58/360_F_271295864_yiioni2LZXAkdVUs1EP6GdR680QR7iKv.jpg")] bg-cover bg-center`}>
                    {title}
            </h1>
            {
                articles.map((item) => (
                    <ArticleOfCategories  key={item.id} article={item} isSingle={isSingleArticle}/>
                ))
            }

        </section>
    )
}