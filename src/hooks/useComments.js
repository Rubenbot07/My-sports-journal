import { getComments } from "@/services/getComments";
import { commentArticle } from "@/services/commentArticle";
import { deleteComment } from "@/services/deleteComment";
import { editComment } from "@/services/editComment";
import { useEffect, useState } from "react";

export function useComments(articleId) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getComments(articleId);
                setComments(data);
            } catch (err) {
                setError(err.message || "Error fetching comments");
            } finally {
                setLoading(false);
            }
        };

        if (articleId) {
            fetchComments();
        }
    }, [articleId]);

    const handleComment = async (e, articleId, authorId) => {
        e.preventDefault();
        const body = e.target.comment.value;
        if (!body) return;

        setLoading(true);
        setError(null);
        try {
            const newComment = await commentArticle(articleId, authorId, body);
            if (newComment) {
                setComments((prevComments) => [newComment, ...prevComments]);
                e.target.reset();
            } else {
                throw new Error("Failed to add comment");
            }
        } catch (err) {
            setError(err.message || "Error adding comment");
        } finally {
            setLoading(false);
        }
        
    }

    const handleDeleteComment = async (commentId) => {
        setLoading(true);
        setError(null);
        try {
            const deletedComment = await deleteComment(commentId);
            if (deletedComment) {
                setComments((prevComments) => prevComments.filter(c => c.id !== commentId));
            } else {
                throw new Error("Failed to delete comment");
            }
        } catch (err) {
            setError(err.message || "Error deleting comment");
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateComment = async (commentId, body) => {
        if (!body) return;

        setLoading(true);
        setError(null);
        try {
            const updatedComment = await editComment(commentId, body);
            if (updatedComment) {
                setComments((prevComments) => prevComments.map(c => c.id === commentId ? updatedComment : c));
            } else {
                throw new Error("Failed to update comment");
            }
        } catch (err) {
            setError(err.message || "Error updating comment");
        } finally {
            setLoading(false);
        }
    }

    return { comments, loading, error, handleComment, handleDeleteComment, handleUpdateComment };
}