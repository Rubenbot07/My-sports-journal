import { RotateCcwKey } from "lucide-react"
import { useState } from "react"
import { usePassword } from "@/hooks/usePassword"
import { useNavigate } from "react-router-dom"

export const UpdatePasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const { handleUpdatePassword, loading, error } = usePassword();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    await handleUpdatePassword(newPassword);
    navigate('/');
  };

  return (
    <section>
      <form
        className="border-primary z-10 relative md:translate-y-1/5 flex flex-col gap-4 w-full min-w-80 md:w-lg bg-white border-1 md:border-gray-300 shadow-lg p-4 rounded-xl"
        onSubmit={handleUpdate}
        noValidate
        aria-labelledby="update-password-title"
      >
        <h1 id="update-password-title" className="text-3xl font-bold text-primary">
          Reset your Password
        </h1>

        <RotateCcwKey className="w-16 h-16 text-primary self-center" />

        <div className="flex flex-col gap-1">
          <label htmlFor="update-password-input" className="self-start">
            New Password
          </label>
          <input
            required
            type="password"
            id="update-password-input"
            className="border border-gray-400 rounded-xl p-2"
            onChange={(e) => setNewPassword(e.target.value)}
            aria-describedby={error ? "update-password-error" : undefined}
          />
        </div>

        {error && (
          <p
            id="update-password-error"
            role="alert"
            className="text-red-500 bg-red-200 rounded-xl p-2"
          >
            {error.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary cursor-pointer rounded-xl text-amber-50 w-1/2 p-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </section>
  );
};