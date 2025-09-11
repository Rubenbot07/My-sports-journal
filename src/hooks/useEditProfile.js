import { updateProfile } from "@/services/profileService";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";

export const useEditProfile = () => {
    const setUser = useUserStore((s) => s.setUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const editProfile = async (data) => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await updateProfile(data);
            setUser(response);
            setMessage("Profile updated successfully!");
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { editProfile, loading, error, message };
};
