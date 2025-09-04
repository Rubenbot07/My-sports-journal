import { getProfile } from "@/services/getProfile";
import { useState, useEffect } from "react";

export function useProfile(email) {
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetchProfile = async () => {
            try {
                const data = await getProfile(email);
                setProfile(data);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [email]);
    return { profile, loading };
}