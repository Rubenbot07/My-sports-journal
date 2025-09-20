import { useState } from "react"
import { useNavigate } from "react-router"
import { useLogin } from "@/hooks/useLogin"
import { Link } from "react-router-dom"
export const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { login, loading } = useLogin()
    const navigate = useNavigate()
    const loginUser = async (e) => {
        e.preventDefault()
        const { user, error } = await login(email, password)
        if (user) {
            navigate('/')
        } else {
            setError(error)
            console.error('Login failed:', error)
        }
    }
return (
    <form
        className="border-primary z-10 relative md:translate-y-1/5 flex flex-col gap-4 w-full min-w-80  md:w-lg bg-white border-1 md:border-gray-300 shadow-lg p-4 rounded-xl" 
        onSubmit={(e) => loginUser(e)}
    >
        <h1  className="text-3xl font-bold text-primary">User Log In</h1>
        <div className="flex flex-col gap-1">
            <label
                className="self-start"
                htmlFor="email"
            >
                Email
            </label>
            <input 
                required
                className="border border-gray-400 rounded-xl p-2"
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)} 
            />
        </div>
        <div className="flex flex-col gap-1">
            <label
                className="self-start"
                htmlFor="password"
            >
                Password
            </label>
            <input
                className="border border-gray-400 rounded-xl p-2"
                required
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <Link to="/forgot-password" className="self-start">Forgot your password?</Link>
        {error && 
            <p className="text-red-500 bg-red-200 rounded-xl p-2">{error.message}</p>
        }
        <button 
            className="bg-primary cursor-pointer rounded-xl text-amber-50 w-1/2 p-2 mx-auto"
            type="submit"
        >
            {loading ? 'Logging in...' : 'Log In'}
        </button>
        <p className="mt-4 text-center text-sm flex items-center justify-center gap-2">
           Don't have an account? 
           <Link to="/register" className="underline hover:text-blue-600">
             Sign up
           </Link>
         </p>
    </form>
    );
}