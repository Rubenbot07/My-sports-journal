import { ArticleLink } from '../../components/ArticleLink';
import Articles from '../../mock-data/sports-articles.json';
export const MostPopular = () => {
    const mostPopularArticles = [...Articles.slice(0, 5)];
    return (
        <section>
            {
                mostPopularArticles.map((article) => (
                    <ArticleLink key={article.id} article={article} />
                ))
            }

        </section>
    )
}