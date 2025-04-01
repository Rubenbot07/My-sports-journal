import { useAuth } from '../context/UserContext'
export const Comment = ({ comment, userName, commentId, articleId }) => {
    const auth = useAuth()
    return (
        <article className="bg-gray-200 p-2 my-2 flex gap-2 flex-col justify-between">
            <h4 className="font-bold">{userName}</h4>
            <p>{comment}</p>
            {
                (auth?.role === 'admin' || auth?.user === userName)
                && (
                    <button
                        onClick={() => auth.deleteComment(articleId, commentId)}
                        className="bg-red-500 text-white p-1 rounded-lg w-40 mx-auto"
                    >
                        Delete
                    </button>
                )
            }
        </article>
    )
}