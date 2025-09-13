import { useEffect, useState } from "react";
import { getArticles } from "@/services/articlesService";
import { useArticleStore } from "@/stores/articleStore";
export const useArticlesList = (limit) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { articles, setArticles } = useArticleStore();


  useEffect(() => {
    if(articles.length > 11) return;
    setLoading(true);
    const fetch = async () => {
      try {
        const data = await getArticles(limit);
        setArticles(data);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError(err);
      } finally {
        setLoading(false);
      }

    };
    fetch();
  }, [limit, setArticles, articles]);
    return { loading, error };
};