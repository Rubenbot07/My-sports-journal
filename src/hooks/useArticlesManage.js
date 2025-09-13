import { deleteArticle } from "@/services/articlesService";

export const useArticlesManage = () => {
    const deleteArticleHandler = async (articleId, deletedBy) => {
        const { data, error } = await deleteArticle(articleId, deletedBy);
        return { data, error };
    };

    return { deleteArticleHandler };
}