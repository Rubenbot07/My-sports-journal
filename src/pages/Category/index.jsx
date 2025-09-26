import { useParams, Link } from "react-router-dom"
import { ArticleOfCategories } from "@/components/articles/ArticleOfCategories"
import { useCategories } from "@/hooks/useCategories";
import { useEffect, useState } from "react";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { ArticleHeroBanner } from "@/components/articles/ArticleHeroBanner";
export const Category = () => {
    const { category } = useParams();
    const { loading, error, fetchCategoriesBySlug } = useCategories();
    const [articles, setArticles] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCategoriesBySlug(category);
                if (data && data.length > 0) {
                    setArticles(data[0].articles);
                    setCategoryTitle(data[0].name);
                }
            } catch (error) {
                console.error("Error fetching category:", error);
            } 
        };
        fetchData();
    }, [category, fetchCategoriesBySlug]);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading category: {error.message}</h1>;
     
    return (
        <section className='grid grid-cols-1 2sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full max-w-[1500px] mx-auto'>
            <ArticleHeroBanner title={categoryTitle} />
            <Link to={`/articles/${articles[0]?.id}`} className="col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2">
                <article className="flex flex-col md:flex-row  bg-gray-200 p-4 rounded-lg shadow-md text-start gap-4 hover:bg-gray-300">
                    <picture className="rounded-lg overflow-hidden md:w-2/3 lg:w-1/2 max-h-96">
                        <source media="(min-width: 1024px)" srcSet={`${articles[0]?.media.find((img) => img.role === 'banner')?.url}`} />
                                <source media="(min-width: 640px)" srcSet={`${articles[0]?.media.find((img) => img.role === 'cover')?.url}`} />
                                <source media="(max-width: 639px)" srcSet={`${articles[0]?.media.find((img) => img.role === 'thumbnail')?.url}`} />
                                <img src={articles[0]?.media.find((img) => img.role === 'thumbnail')} alt={articles[0]?.title} className='w-full h-full md:object-cover hover:scale-105 transition-all duration-500 ' />
                    </picture>
                    <div className="flex flex-col gap-4 lg:gap-8 p-2 md:w-1/3 lg:w-1/2 overflow-hidden">
                        <h2 className='text-md'>{new Date(articles[0]?.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || articles[0]?.published_at}</h2>
                        <h3 className='font-bold text-lg 2sm:text-2xl md:text-3xl lg:text-5xl'>{articles[0]?.title}</h3>
                        <div className="md:text-lg lg:text-xl">
                            <MarkdownRenderer content={articles[0]?.excerpt} />
                        </div>
                    </div>
                </article>
            </Link>
            {
                articles.slice(1).map(article => (
                    <ArticleOfCategories key={article?.id} article={article} />
                ))
            }
        </section>
    )
}