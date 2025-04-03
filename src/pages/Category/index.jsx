import { useParams } from "react-router-dom"
import { useAuth } from "../../context/UserContext"
import { ArticleLink } from "../../components/ArticleLink"
export const Category = () => {
    const { category } = useParams();
    const auth = useAuth()
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)
    const categoryArticles = auth.articles.filter(article => article.category === categoryTitle)
    return (
        <section>
            <h1>{ categoryTitle }</h1>
            {
                categoryArticles.map(article => (
                    <ArticleLink key={article.id} article={article} />
                ))
            }
        </section>
    )
}