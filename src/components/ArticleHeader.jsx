import { Link } from 'react-router-dom';
import { ArticleHeroBanner } from '@/components/ArticleHeroBanner';
export const ArticleHeader = ({ article }) => {
    return (
        <header className='flex flex-col gap-8'>
            <h3 className='bg-gray-300 p-2 w-fit rounded-sm border-l-4 border-l-primary cursor-pointer'>
                <Link to={`/category/${article?.categories.slug}`} >{article?.categories.name} <span className='text-primary font-bold'>/</span> {new Date(article?.published_at).toLocaleDateString()}</Link>
            </h3>
            <i className='flex gap-2 text-lg text-start text-gray-500'>
                By
                <Link to={`/authors/${article?.profiles.id}|${article?.profiles.display_name}`} className='underline font-bold'>
                    {article?.profiles.display_name}
                </Link>
                Sports Journal
            </i>
            <ArticleHeroBanner articleTitle={article?.title} />
        </header>
    );
}