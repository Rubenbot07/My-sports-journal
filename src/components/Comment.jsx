import { Link } from 'react-router-dom'
import { EditCommentForm } from './EditCommentForm'
export const Comment = ({ auth, comment, userName, commentId, articleId }) => {
    const handleUpdateComment = (e) => {
        e.preventDefault()
        auth.updateComment(articleId, commentId, e.target[0].value)
    }
  

    return (
        <article className="bg-gray-200 p-2 my-2 flex gap-2 flex-col justify-between">
            {
                (!auth?.isEditComment || auth?.user !== userName) &&  (
                    <div>
                        <Link to={`/profile/${userName}`} className="font-bold">
                            <h4 className="font-bold">{userName}</h4>
                        </Link>
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
                        {
                            auth?.user === userName && (
                                <button
                                    onClick={() => auth.setIsEditComment(true)}
                                    className="bg-blue-500 text-white p-1 rounded-lg w-40 mx-auto"
                                >
                                    Edit
                                </button>
                            )
                        }
                    </div>
                )
            }
            {
                (auth?.isEditComment && auth?.user === userName) && (
                    <EditCommentForm handlerFunction={handleUpdateComment} comment={comment} />
                )
            }
        </article>
    )
}