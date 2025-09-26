import { ArticleHeroBanner } from '@/components/articles/ArticleHeroBanner';
import { useCategories } from '@/hooks/useCategories';
import { useArticlesManage } from '@/hooks/useArticlesManage';
import { useEffect, useState } from 'react';
import { slugGenerator } from '@/utils/slugGenerator';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';

export const CreateArticleForm = () => {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { categories, fetchAllCategories } = useCategories();
    const { createArticleHandler } = useArticlesManage();
    const user = useUserStore((s) => s.user);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const slug = slugGenerator(title);

        const data = {
            title: title,
            content_markdown: content,
            excerpt: excerpt,
            slug: slug,
            categoryId: category,
            status: 'in_review',
            author_id: user.id
        };

        try {
            setLoading(true);
            const { createdData, error } = await createArticleHandler(data);
            if (error) {
                setError(error);
            }
            setLoading(false);
            navigate(`/upload-images/${createdData[0].id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllCategories();
    }, [fetchAllCategories]);

    return (
        <section>
            <ArticleHeroBanner title={'Create Article'} />
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-2 w-full h-svh border border-gray-400 p-4'>
                <label htmlFor="title">Title</label>
                <input onChange={(e) => setTitle(e.target.value)} required type="text" name="title" id="title"  className='border border-gray-400'/>
                <label htmlFor="content">Content</label>
                <textarea onChange={(e) => setContent(e.target.value)} required name="content" id="content" className='border border-gray-400 h-1/2 text-center'></textarea>
                <label htmlFor="excerpt">Excerpt</label>
                <textarea onChange={(e) => setExcerpt(e.target.value)} name="excerpt" id="excerpt" className='border border-gray-400 h-1/4 text-center'></textarea>
                <select className='border border-gray-400 p-2' required name="category" id="select-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <button className='bg-primary cursor-pointer rounded-xl text-amber-50 w-1/2 p-2 mx-auto'>{loading ? 'Creating...' : 'Create' }</button>
                {error && <p>{error}</p>}
            </form>
        </section>
    )
}