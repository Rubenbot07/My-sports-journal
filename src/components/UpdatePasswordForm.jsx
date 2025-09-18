import { RotateCcwKey } from "lucide-react"
import { useState } from "react"
import { usePassword } from "@/hooks/usePassword"
import { useNavigate } from "react-router-dom"

export const UpdatePasswordForm = () => {
    const [newPassword, setNewPassword] = useState('')
    const { handleUpdatePassword, loading, error } = usePassword()
    const navigate = useNavigate()
    const handleUpdate = async (e) => {
        e.preventDefault()
        await handleUpdatePassword(newPassword)
        navigate('/')
    }
    return (
        <section>
            <form
                className="border-primary z-10 relative md:translate-y-1/5 flex flex-col gap-4 w-full min-w-80  md:w-lg bg-white border-1 md:border-gray-300 shadow-lg p-4 rounded-xl" 
                onSubmit={(e) => handleUpdate(e)}
            >
                <h1  className="text-3xl font-bold text-primary">Reset your Password</h1>
                <RotateCcwKey className="w-16 h-16 text-primary self-center" />
                <div className="flex flex-col gap-1">
                    <label
                        className="self-start"
                        htmlFor="newPassword"
                    >
                        New Password
                    </label>
                    <input 
                        required
                        className="border border-gray-400 rounded-xl p-2"
                        type="password"
                        id="newPassword"
                        onChange={(e) => setNewPassword(e.target.value)} 
                    />
                </div>
                { error && 
                    <p className="text-red-500 bg-red-200 rounded-xl p-2">{error.message}</p>
                }
                <button 
                    className="bg-primary cursor-pointer rounded-xl text-amber-50 w-1/2 p-2 mx-auto"
                    type="submit"
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
        </section>
    )
}