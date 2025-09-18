import { useArticlesManage } from "@/hooks/useArticlesManage";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EditButton } from "@/components/EditButton";
export const ArticleHandler = ({ articleId, roles, userId, setRemoveArticle }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
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
    }

    if(error) return <p>Error deleting article: {error.message}</p>

    return (
        <div className='flex flex-col 2sm:col-span-3 p-4 gap-4 w-full  2sm:flex-row justify-center md:justify-start items-start'>
            {
                roles?.includes('admin') && (
                    <>
                        <button
                            onClick={() => deleteArticle(articleId, userId, setRemoveArticle)}
                            className='bg-primary cursor-pointer text-white p-2 rounded-lg min-w-32 max-w-56'
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                        <EditButton />
                    </>
                )
            }
            {
                roles?.includes('editor') || roles === 'editor' && (
                    <>
                        <button className='bg-primary cursor-pointer text-white p-2 rounded-lg'>
                            Edit
                        </button>
                    </>
                )
            }
        </div>
    );
}