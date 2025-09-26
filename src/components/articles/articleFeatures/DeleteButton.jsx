import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useArticlesManage } from "@/hooks/useArticlesManage";
export const DeleteButton = ({ articleId, userId, setRemoveArticle }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { deleteArticleHandler } = useArticlesManage();

    const deleteArticle = async (articleId, deletedBy, setRemoveArticle) => {
        setLoading(true);
        try {
            const { error } = await deleteArticleHandler(articleId, deletedBy);
            if (error) setError(error);
            setRemoveArticle(articleId);
            navigate('/');
        } catch (error) {
            console.error('Error deleting article:', error);
            throw error;
        } finally {
            setLoading(false);
        }
  }; 

    return (
        <>        
            <button
                onClick={() => deleteArticle(articleId, userId, setRemoveArticle)}
                className="bg-primary flex justify-center items-center cursor-pointer text-white p-2 rounded-lg min-w-32 max-w-56 disabled:opacity-50"
                disabled={loading}
                aria-busy={loading}
                aria-label={loading ? "Deleting article" : "Delete article"}
            >
                <span>
                    {loading ? 'Deleting…' : 'Delete'}
                </span>
                <Trash2 className="inline-block ml-2" size={20} />
            </button>
            {
                error && (
                    <p role="alert" className="text-red-600 font-medium">
                        Error deleting article: {error.message}
                    </p>
                )
            }
        </>
    )
}