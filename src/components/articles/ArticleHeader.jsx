import { Link } from 'react-router-dom';
import { ArticleHeroBanner } from '@/components/articles/ArticleHeroBanner';
export const ArticleHeader = ({ article }) => {
  return (
    <header className="flex flex-col gap-8">
      <p className="bg-gray-300 p-2 w-fit rounded-sm border-l-4 border-l-primary">
        <Link 
          to={`/category/${article?.categories.slug}`} 
          aria-label={`View more articles in ${article?.categories.name} category`}
          className="cursor-pointer"
        >
          {article?.categories.name}
        </Link>
        <span className="text-primary font-bold mx-1">/</span>
        <time dateTime={article?.published_at}>
          {new Date(article?.published_at).toLocaleDateString()}
        </time>
      </p>

      <p className="flex gap-2 text-lg text-start text-gray-500">
        By{" "}
        <Link 
          to={`/authors/${article?.profiles.id}|${article?.profiles.display_name}`} 
          className="underline font-bold"
          aria-label={`View profile of ${article?.profiles.display_name}`}
        >
          {article?.profiles.display_name}
        </Link>
        <span>– Sports Journal</span>
      </p>

      <ArticleHeroBanner title={article?.title} />
    </header>
  );
};