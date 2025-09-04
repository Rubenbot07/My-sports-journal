import { useUserStore } from '@/stores/userStore';
import { useComments } from '@/hooks/useComments';
import { Link, useLocation } from 'react-router-dom';
import { Comment } from '@/components/Comment';
export const CommentContainer = ({ articleId }) => {
    const { comments, loading, error, handleComment, handleDeleteComment, handleUpdateComment } = useComments(articleId);
    const user = useUserStore((state) => state.user);
    const location = useLocation();

    if (loading) return <h2>Loading comments...</h2>;
    if (error) return <h2>Error loading comments: {error}</h2>;
    return (
        <div className='col-span-3 lg:col-span-1 flex flex-col gap-4 bg-gray-200 h-fit lg:max-h-[800px] lg:overflow-y-scroll  p-4 rounded-lg'>
            <h2 className='text-xl font-bold'>Comments</h2>
            {comments?.map(comment => (
                <div key={comment.id} className='flex flex-col gap-2 bg-white p-2 rounded-lg '>
                    <Comment comment={comment} loading={loading} handleDeleteComment={handleDeleteComment} handleUpdateComment={handleUpdateComment}/>
                </div>
            ))}
            {
                user ? (
                    <form
                        onSubmit={(e) => {handleComment(e, articleId, user.id)}}
                        className='flex flex-col gap-2'
                    >
                        <div className='flex justify-between gap-1 border border-gray-300 rounded-lg p-2 bg-white'>
                            <input
                                type='text'
                                name='comment'
                                placeholder='Add a comment...'
                                className='w-full outline-none'
                            />
                            <button
                                type='submit'
                                className='text-primary'
                            >
                                Post
                            </button>
                        </div>
                    </form>
                ) : (
                    <Link to='/login' state={{ from: location }} className='sticky bottom-0'>
                        <button className='text-white bg-primary p-2 rounded-lg'>Log In To Leave A Comment</button>
                    </Link>
                )
            }
        </div> 
    )
};  
