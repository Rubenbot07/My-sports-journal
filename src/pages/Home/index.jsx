import { ArticleLink } from '../../components/ArticleLink';
import { useAuth } from '../../context/UserContext';
export const Home = () => {
    const { articles } = useAuth()
    return (
        <div>
            <h1>Home</h1>
            {articles.map((article) => (               
                <ArticleLink key={article.id} article={article}></ArticleLink>
            ))}
        </div>
    )
}