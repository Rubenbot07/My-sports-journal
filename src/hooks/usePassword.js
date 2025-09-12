import { useState } from "react";
import { resetPassword } from "@/services/authService";

export const usePassword = (email) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async () => {
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
    
    return { handleResetPassword, loading, error, success };
};