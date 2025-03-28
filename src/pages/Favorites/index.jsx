import { useAuth } from "../../context/UserContext"
import { ArticleLink } from "../../components/ArticleLink"
import Articles from '../../mock-data/sports-articles.json';

export const Favorites = () => {
    const auth = useAuth()
    console.log(auth.favorites)
    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-2xl font-bold bg-blue-500'>Favorites</h1>
            {
                auth.favorites.map(favorite => (
                    <ArticleLink key={favorite.id} article={favorite} />
                ))
            }
        </section>
    )
}