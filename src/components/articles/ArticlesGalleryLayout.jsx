import { ArticleOfCategories } from '@/components/articles/ArticleOfCategories';
import { ArticleHeroBanner } from '@/components/articles/ArticleHeroBanner';
export const ArticlesGalleryLayout = ({ title, articles}) => {
    const isSingleArticle = articles.length === 1;
    return (
        <section className={`grid grid-cols-1 2sm:grid-cols-2 md:grid-cols-1 ${isSingleArticle ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-4 p-4 w-full max-w-[1500px] mx-auto`}>
            <ArticleHeroBanner title={title} />
            {
                articles.map((item) => (
                    <ArticleOfCategories  key={item.id} article={item} isSingle={isSingleArticle}/>
                ))
            }

        </section>
    )
}