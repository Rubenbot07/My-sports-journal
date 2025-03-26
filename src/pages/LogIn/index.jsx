import { useState } from "react"
import { useAuth } from "../../context/UserContext"
export const Login = () => {
    const auth = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = (e) => {
        e.preventDefault()
        auth.login({ username, userPassword: password })
    }

    return (
        <section className="flex flex-col gap-8">
            <h1  className="text-2xl font-bold">Log In</h1>
            <form
                className="flex flex-col gap-3 w-3/6 min-w-56 mx-auto bg-blue-100 p-4 rounded-xl" 
                onSubmit={(e) => loginUser(e)}
            >
                <label
                    className="self-start"
                    htmlFor="username"
                >
                    Username
                </label>
                <input 
                    required
                    className="border border-blue-600 rounded-xl p-2"
                    type="text"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <label
                    className="self-start"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="border border-blue-600 rounded-xl p-2"
                    required
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}/>
                <button 
                    className="bg-blue-500 rounded-xl text-amber-50 w-22 p-2"
                    type="submit"
                >
                    Log In
                </button>
                
            </form>
            {auth.wrongUser && 
                <p className="text-red-500">Wrong user or password</p>
            }
        </section>
    )
}