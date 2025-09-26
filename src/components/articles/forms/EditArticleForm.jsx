import { useState } from "react";
import { useArticleStore } from "@/stores/articleStore";
import { useArticlesManage } from "@/hooks/useArticlesManage";
import { useNavigate } from "react-router-dom";
export const EditArticleForm = () => {
    const article = useArticleStore((state) => state.article);
    const { updateArticleHandler } = useArticlesManage();
    const [title, setTitle] = useState(article.title)
    const [content, setContent] = useState(article.content_markdown)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await updateArticleHandler(article.id, {title: title, content_markdown: content, status: 'in_review'})
            navigate('/')
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }
    return (
        <section className='text-center w-full mx-auto flex flex-col gap-8 h-10/12 overflow-y-scroll'>
            <form
                onSubmit={(e) => {
                    handleSubmit(e)
                }} 
                className="flex flex-col gap-4 w-full min-w-7/8 mx-auto p-4 "
            >
                <label htmlFor="title" className="bg-primary text-white rounded-md">Edit Title</label>
                <input 
                    type="text"
                    id="title"
                    value={title}
                    className="border border-primary rounded-md p-2 text-center bg-white"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="content" className="bg-primary text-white rounded-md">Edit Content</label>
                <textarea 
                    type="text"
                    id="content"
                    value={content}
                    className="border border-primary rounded-md p-2 text-center bg-white h-48"
                    onChange={(e) => setContent(e.target.value)}
                />
                <button 
                    className="bg-primary text-white p-2 rounded-lg"
                    type="submit"
                >
                    {loading ? 'Updating...' : 'Update'}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </section>
    )
}