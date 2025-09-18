import { useState } from "react";
import { resetPassword, updatePassword } from "@/services/authService";

export const usePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await resetPassword(email);
            console.log(window.location.origin);
            if (error) {
                setError(error);
            }
            setSuccess(true);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (password) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await updatePassword(password);
            if (error) {
                setError(error);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    
    return { handleResetPassword, handleUpdatePassword, loading, error, success };
};