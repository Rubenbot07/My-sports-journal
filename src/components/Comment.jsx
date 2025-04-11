import { Link } from 'react-router-dom'
import { EditCommentForm } from './EditCommentForm'
import { useState } from 'react'
export const Comment = ({ auth, comment, userName, commentId, articleId }) => {
    const [openOptions, setOpenOptions] = useState(false)
    const profilePhoto = auth?.users?.find(user => user.name === userName)?.photo
    console.log(profilePhoto)
    const handleOptions = () => {
        setOpenOptions(!openOptions)
    }
    const handleUpdateComment = (e) => {
        e.preventDefault()
        auth.updateComment(articleId, commentId, e.target[0].value)
        setOpenOptions(false)
    }
  

    return (
        <article className=" relative bg-white text-start py-5 px-2 flex gap-2 flex-col justify-between">
            <button className='absolute bottom-3/6 right-3 text-3xl cursor-pointer h-full text-primary z-50' onClick={handleOptions}>...</button>
            {
                (!auth?.isEditComment || auth?.user !== userName) &&  (
                    <div className="flex flex-col gap-2 relative">
                        <Link to={`/profile/${userName}`} className="font-bold flex gap-2 items-center">
                            <div className='w-10 h-10 rounded-full bg-gray-300 overflow-hidden'>
                                <img src={profilePhoto ? profilePhoto : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png'} alt={userName} className='object-cover'/>
                            </div>
                            <h4 className="font-bold">{userName}</h4>
                        </Link>
                        <p className='pl-2'>{comment}</p>
                        <div className={`${openOptions ? 'flex' : 'hidden'} flex-col gap-3 items-start bg-white border-1 absolute top-3 right-0 border-gray-500 rounded-lg shadow-md p-2 w-24`}>
                            {
                                (auth?.role === 'admin' || auth?.user === userName)
                                && (
                                    <button
                                        onClick={() => auth.deleteComment(articleId, commentId)}
                                        className=" text-black text-sm font-bold hover:text-primary"
                                    >
                                        Delete
                                    </button>
                                )
                            }
                            {
                                auth?.user === userName && (
                                    <button
                                        onClick={() => auth.setIsEditComment(true)}
                                        className="text-black text-sm font-bold hover:text-primary"
                                    >
                                        Edit
                                    </button>
                                )
                            }
                        </div>
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