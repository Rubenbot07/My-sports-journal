import { getArticlesByAuthor } from "@/services/articlesService";
import { useEffect, useState } from "react";

export function useAuthors(authorId) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        try {
            setLoading(true);
            setError(null);
            const fetch = async () => {
                const data = await getArticlesByAuthor(authorId);
                setData(data);
            };
            fetch();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [authorId]);
    return { data, error, loading };
}