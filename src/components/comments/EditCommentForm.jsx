import { useState } from "react"
export const EditCommentForm = ({ handlerFunction, comment}) => {
    const [body, setBody] = useState(comment.body)
    const handleSubmit = (e) => {
        e.preventDefault();
        handlerFunction(comment.id, body);
    }
    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-2"
            onChange={(e) => setBody(e.target.value)}
        >
            <input
                className="border border-gray-400 rounded-xl p-2"
                type="text"
                defaultValue={comment.body}
            />    
            <button
                type="submit"
                className="bg-primary text-white p-1 rounded-lg w-full max-w-40 mx-auto"
            >
                Update
            </button>
        </form>
    )
}