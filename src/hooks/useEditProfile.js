import { updateProfile } from "@/services/profileService";
import { useState } from "react";

export const useEditProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const editProfile = async (data) => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            await updateProfile(data);
            setMessage("Profile updated successfully!");
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { editProfile, loading, error, message };
};
