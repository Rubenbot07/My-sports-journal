import { Link } from 'react-router-dom'
import { EditCommentForm } from './EditCommentForm'
import { useState } from 'react'
import { Ellipsis } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
export const Comment = ({ comment, loading, handleDeleteComment, handleUpdateComment }) => {
    const [openOptions, setOpenOptions] = useState(false);
    const [isEditComment, setIsEditComment] = useState(false);
    const user = useUserStore((state) => state.user);
    const roles = useUserStore((state) => state.roles).map(r => r.name);

    const handleOptions = () => setOpenOptions(!openOptions);
    const handleEditComment = () => {
        setIsEditComment(true);
        setOpenOptions(false);
    };

    if (loading) return <h1>Loading...</h1>;

    const canModify = user?.email === comment?.profiles?.email || roles.includes('admin');

    return (
        <article className="relative bg-white text-start py-5 px-2 flex gap-2 flex-col justify-between">
            
            {/* Options button */}
            {canModify && (
                <button
                    aria-label="Comment options"
                    className='absolute top-2 right-2 text-2xl cursor-pointer text-primary z-50'
                    onClick={handleOptions}
                >
                    <Ellipsis />
                </button>
            )}

            <div className="flex flex-col gap-2 relative">
                {/* User info */}
                <Link to={`/profile/${comment.profiles.email}`} className="font-bold flex gap-2 items-center">
                    <div className='w-10 h-10 rounded-full bg-gray-300 overflow-hidden'>
                        <img
                            src={comment?.profiles?.avatar_url || 'https://pqbzzgeczhqphepwilwv.supabase.co/storage/v1/object/public/company%20images/defaultAvatar.webp'}
                            alt={comment.profiles.display_name}
                            className='w-full h-full object-cover object-center'
                        /> 
                    </div>
                    <h4 className="font-bold">{comment.profiles.display_name}</h4>
                </Link>

                {/* Comment body */}
                {!isEditComment && <p className='pl-2'>{comment.body}</p>}

                {/* Options menu */}
                {openOptions && canModify && (
                    <div
                        className="flex flex-col gap-2 items-start bg-white border border-gray-500 rounded-lg shadow-md p-2 w-32 absolute top-2 right-0"
                        role="menu"
                        aria-label="Comment options menu"
                    >
                        {roles.includes('admin') || user?.email === comment?.profiles?.email ? (
                            <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-black text-sm font-bold hover:text-primary w-full text-start"
                            >
                                Delete
                            </button>
                        ) : null}
                        {user?.email === comment.profiles?.email && (
                            <button
                                onClick={handleEditComment}
                                className="text-black text-sm font-bold hover:text-primary w-full text-start"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Edit comment form */}
            {isEditComment && user.id === comment.profiles.id && (
                <EditCommentForm handlerFunction={handleUpdateComment} comment={comment} />
            )}
        </article>
    );
};