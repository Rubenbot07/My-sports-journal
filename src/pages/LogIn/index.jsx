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
        <section className="flex flex-col gap-8 max-w-[1500px] mx-auto w-full p-4 flex-1 md:min-h-[700px]">
            <div className="flex flex-col items-center relative rounded-xl w-full md:bg-[url('https://imgs.elpais.com.uy/dims4/default/886e19b/2147483647/strip/true/crop/775x533+12+0/resize/1440x990!/quality/90/?url=https%3A%2F%2Fel-pais-uruguay-production-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fuploads%2F2019%2F02%2F16%2F5c687fc0a5be4.jpeg')] bg-cover bg-center md:max-h-96">
                <span className="hidden md:block bg-primary/50 rounded-xl z-10 absolute w-full h-auto top-0 left-0 right-0 bottom-0"></span>
                <form
                    className="border-primary z-10 relative md:translate-y-1/5 flex flex-col gap-4 w-full min-w-80  md:w-lg bg-white border-1 md:border-gray-300 shadow-lg p-4 rounded-xl" 
                    onSubmit={(e) => loginUser(e)}
                >
                    <h1  className="text-3xl font-bold text-primary">User Log In</h1>
                    <div className="flex flex-col gap-1">
                        <label
                            className="self-start"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input 
                            required
                            className="border border-gray-400 rounded-xl p-2"
                            type="text"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)} 
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
                    <span className="self-start">Forgot your password?</span>
                    {auth.wrongUser && 
                        <p className="text-red-500 bg-red-200 rounded-xl p-2">Wrong user or password</p>
                    }
                    <button 
                        className="bg-primary cursor-pointer rounded-xl text-amber-50 w-1/2 p-2 mx-auto"
                        type="submit"
                    >
                        Log In
                    </button>
                    {/* Divider with "OR" */}
                    <div className="flex items-center gap-4 my-4">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="text-gray-500 font-medium">OR</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    {/* Social login buttons */}
                    <div className="flex gap-4 mx-auto flex-col md:flex-row">
                        <button className="flex items-center justify-center gap-2 cursor-pointer border border-gray-400 rounded-xl p-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="Google" className="w-5 h-5" />
                            Continue with Google
                        </button>
                        <button className="flex items-center justify-center gap-2 cursor-pointer border border-gray-400 rounded-xl p-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" className="w-5 h-5" />
                            Continue with Facebook
                        </button>
                    </div>
                </form>
            </div>
    
        </section>
    )
}