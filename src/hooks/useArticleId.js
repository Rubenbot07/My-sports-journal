import { getArticleById } from "@/services/articlesService";
import { useEffect, useState } from "react";
import { useArticleStore } from "@/stores/articleStore";

export const useArticleId = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setArticle } = useArticleStore();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const fetch = async () => {
      try {
        const data = await getArticleById(id);
        setArticle(data);
      } catch (err) {
        console.error("Failed to fetch article:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, setArticle]);

  return { loading, error };
}