import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCategories } from '@/hooks/useCategories';

export const ArticleAside = ({ categoryId, articleId }) => {
    const [articles, setArticles] = useState([]);
    const [category , setCategory] = useState('');
    const { loading, error, fetchCategoriesById } = useCategories();
    useEffect(() => {
        if (!categoryId || category === categoryId) return;
        const fetchArticles = async () => {
            setCategory(categoryId);
            try {
                const data = await fetchCategoriesById(categoryId);
                if (data && data.length > 0) {
                    setArticles(data[0].articles.filter(article => article.id !== articleId));
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };
        fetchArticles();
    }, [categoryId, articleId, category, fetchCategoriesById]);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading articles: {error.message}</h1>;


    return (
        <aside className='h-full w-full bg-gray-200 p-4 rounded-lg shadow-md flex flex-col gap-4'>
            <h2 className='text-center text-xl md:text-2xl font-bold'>Related</h2>
            <p className='text-center text-gray-500'>Checkout related articles</p>
            <div className='flex lg:gap-4 gap-2 justify-center lg:flex-col md:flex-row md:flex-wrap flex-col'>
                {articles?.map((article) => (
                    <Link to={`/articles/${article?.id}`} key={article?.id}>
                        <div 
                            className=' bg-white border-1 border-l-8 border-l-primary border-gray-300 rounded-lg p-2 lg:p-4 hover:bg-gray-100 transition duration-300 cursor-pointer shadow-md'
                        >
                            <h3 className='text-md  font-bold'>{article?.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    )
}