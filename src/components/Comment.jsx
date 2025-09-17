import { Link } from 'react-router-dom'
import { EditCommentForm } from './EditCommentForm'
import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'
export const Comment = ({comment, loading, handleDeleteComment, handleUpdateComment}) => {
    const [openOptions, setOpenOptions] = useState(false)
    const [isEditComment, setIsEditComment] = useState(false)
    const user = useUserStore((state) => state.user);
    const roles = useUserStore((state) => state.roles).map(r => r.name);
    const handleOptions = () => {
        setOpenOptions(!openOptions)
    }

    const handleEditComment = () => {
        setIsEditComment(true)
        setOpenOptions(false)
    }

    if (loading) return <h1>Loading...</h1>;

    return (
        <article className=" relative bg-white text-start py-5 px-2 flex gap-2 flex-col justify-between">
            {
                (user?.email === comment?.profiles?.email || roles.includes('admin')) &&  (
                    <button className='absolute bottom-3/6 right-3 text-4xl cursor-pointer h-full text-primary z-50' onClick={handleOptions}>...</button>
                )
            }             
            <div className="flex flex-col gap-2 relative">
                <Link to={`/profile/${comment.profiles.email}`} className="font-bold flex gap-2 items-center">
                    <div className='w-10 h-10 rounded-full bg-gray-300 overflow-hidden'>
                        <img src={comment?.profiles?.avatar_url ? comment.profiles?.avatar_url : '/src/assets/defaultAvatar.webp'} alt={comment.profiles.display_name} className='w-full h-full object-cover object-center'/> 
                    </div>
                    <h4 className="font-bold">{comment.profiles.display_name}</h4>
                </Link>
                <p className='pl-2'>{!isEditComment && comment.body}</p>
                <div className={`${openOptions ? 'flex' : 'hidden'} flex-col gap-3 items-start bg-white border-1 absolute top-3 right-0 border-gray-500 rounded-lg shadow-md p-2 w-32`}>
                    {
                        (roles.includes('admin') || user?.email === comment?.profiles?.email)
                        && (
                            <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className=" text-black text-sm font-bold hover:text-primary w-full text-start"
                            >
                                Delete
                            </button>
                        )
                    }
                    {
                        user?.email === comment.profiles?.email && (
                            <button
                                onClick={() => handleEditComment(comment.id)}
                                className="text-black text-sm font-bold hover:text-primary w-full text-start"
                            >
                                Edit
                            </button>
                        )
                    }
                </div>
            </div>
                
            {
                (isEditComment && user.id === comment.profiles.id) && (
                    <EditCommentForm handlerFunction={handleUpdateComment} comment={comment} />
                )
            }
            
            
        </article>
    )
}