import { useState } from "react";
import { useEditProfile } from "@/hooks/useEditProfile";


export const EditProfileForm = ({ onClose, userId, userName, userBio }) => {
    const [displayName, setDisplayName] = useState(userName);
    const [bio, setBio] = useState(userBio);
    const { editProfile, loading, error } = useEditProfile();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editProfile({ user_id: userId, display_name: displayName, bio });
            onClose(false); // cerrar modal tras éxito
        } catch (err) {
            console.error("Failed to edit profile:", err);
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
                <label htmlFor="username" className="font-semibold">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="border border-gray-400 rounded-xl p-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="bio" className="font-semibold">Your bio</label>
                <textarea
                    id="bio"
                    required
                    value={bio}
                    minLength={10}
                    maxLength={100}
                    onChange={(e) => setBio(e.target.value)}
                    className="border border-gray-400 rounded-xl p-2"
                />
            </div>

            <button
                type="submit"
                disabled={loading || !displayName || !bio}
                className="bg-primary disabled:bg-gray-400 text-white p-2 rounded-lg w-full max-w-xs mx-auto"
            >
                {loading ? "Editing..." : "Edit"}
            </button>

            {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </form>
    );
};