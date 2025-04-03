import { useParams } from "react-router-dom";
import Articles from "../mock-data/sports-articles.json";
import { useAuth } from "../context/UserContext";
import { useState } from "react";
export const EditArticleForm = () => {
    const auth = useAuth()
    const { articleId } = useParams();
    const currentArticle = Articles.find(article => article.id === parseInt(articleId));
    const [title, setTitle] = useState(currentArticle.title)
    const [content, setContent] = useState(currentArticle.content)
    const [author, setAuthor] = useState(currentArticle.author)
    const [date, setDate] = useState(currentArticle.publishedDate)
    const [category, setCategory] = useState(currentArticle.category)
    console.log(category)
    return (
        <section className='text-center w-5/6 mx-auto flex flex-col gap-8'>
            <h1 className='text-2xl font-bold bg-blue-500'>Edit Article</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    auth.editArticle(articleId, title, author, date, content, category)
                }} 
                className="flex flex-col gap-4 w-4/6 min-w-72 mx-auto p-4 "
            >
                <label htmlFor="title" className="bg-amber-300">Edit Title</label>
                <input 
                    type="text"
                    id="title"
                    value={title}
                    className="border border-blue-500 p-2 text-center bg-white"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="content" className="bg-amber-300">Edit Content</label>
                <textarea 
                    type="text"
                    id="content"
                    value={content}
                    className="border border-blue-500 p-2 text-center bg-white h-48"
                    onChange={(e) => setContent(e.target.value)}
                />
                <label htmlFor="author" className="bg-amber-300">Edit Author</label>
                <input 
                    type="text"
                    id="author"
                    value={author}
                    className="border border-blue-500 p-2 text-center bg-white"
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <label htmlFor="date" className="bg-amber-300">Edit Date</label>
                <input 
                    type="text"
                    id="date"
                    value={date}
                    className="border border-blue-500 p-2 text-center bg-white" 
                    onChange={(e) => setDate(e.target.value)}
                />
                <select
                    className="border border-blue-500 p-2 text-center bg-white"  
                    name="category"
                    id="category"
                    onChange={(e) => e.target.value && setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Soccer">Soccer</option>
                    <option value="Esports">Esports</option>
                </select>
                <button 
                    className="bg-blue-500 text-white p-2 rounded-lg"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </section>
    )
}