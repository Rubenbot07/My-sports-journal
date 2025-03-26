import { ArticleLink } from '../../components/ArticleLink';
import Articles from '../../mock-data/sports-articles.json';

export const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            {Articles.map((article) => (               
                <ArticleLink key={article.id} article={article}></ArticleLink>
            ))}
        </div>
    )
}