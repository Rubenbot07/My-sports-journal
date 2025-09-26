import { useState } from "react";
import { useEditProfile } from "@/hooks/useEditProfile";


export const EditProfileForm = ({ onClose, userId, userName, userBio }) => {
    const [displayName, setDisplayName] = useState(userName);
    const [bio, setBio] = useState(userBio);
    const { editProfile, loading, error } = useEditProfile();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        // espera que la actualización termine
        await editProfile({ user_id: userId, display_name: displayName, bio });
        // si éxito: cerrar modal
        onClose(false);
        } catch (err) {
        // el hook ya setea `error`; aquí puedes mostrar toast o dejar que
        // la UI muestre el error debajo del boton
        console.error("Failed to edit profile:", err);
        }
    };
    return (
        <form  className="flex flex-col gap-2" action="">
            <label htmlFor="username">Username</label>
            <input
                id="username"
                className="border border-gray-400 rounded-xl p-2"
                type="text"
                placeholder="Username"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
            />
            <label htmlFor="bio">Your bio</label>
            <textarea
                className="border border-gray-400 rounded-xl p-2"
                required
                id="bio"
                value={bio}
                maxLength={100}
                minLength={10}
                onChange={(e) => setBio(e.target.value)}
            />
            <button
                type="submit"
                disabled={loading || (!displayName || !bio)}
                className="bg-primary disabled:bg-gray-400 text-white p-1 rounded-lg w-full max-w-40 mx-auto"
                onClick={(e) => handleSubmit(e)}
            >
                {loading ? "Editing..." : "Edit"}
            </button>
            {error && <p className="text-red-500">{error.message}</p>}
        </form>
    )
}