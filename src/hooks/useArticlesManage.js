import { deleteArticle } from "@/services/articlesService";
import { updateArticle } from "@/services/articlesService";
import { createArticle } from "@/services/articlesService";

export const useArticlesManage = () => {

    const updateArticleHandler = async (articleId, data) => {
        const { data: updatedData, error } = await updateArticle(articleId, data);
        return { data: updatedData, error };
    }

    const deleteArticleHandler = async (articleId, deletedBy) => {
        const { data, error } = await deleteArticle(articleId, deletedBy);
        return { data, error };
    };

    const createArticleHandler = async (data) => {
        const { data: createdData, error } = await createArticle(data);
        return { data: createdData, error }; 
    }

    return { deleteArticleHandler, updateArticleHandler, createArticleHandler };
}