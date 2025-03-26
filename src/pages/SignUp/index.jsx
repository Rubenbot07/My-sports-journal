export const SignUp = () => {
    return (
        <section className="flex flex-col gap-8">
            <h1>Sign Up</h1>
            <form className="flex flex-col gap-4 w-3/6 min-w-56 mx-auto bg-blue-100 p-4 rounded-xl">
                <label 
                    className="self-start" 
                    htmlFor="username"
                >
                    Username
                </label>
                <input 
                    required
                    className="border border-blue-500 p-2 rounded-xl"
                    type="text"
                    id="username" 
                />
                <label 
                    className="self-start"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    required
                    className="border border-blue-500 p-2 rounded-xl" 
                    type="email"
                    id="email" 
                />
                <label 
                    className="self-start"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    required
                    className="border border-blue-500 p-2 rounded-xl"
                    type="password" 
                    id="password" 
                />
                <button 
                    className="bg-blue-500 text-amber-50 w-22 p-2 rounded-xl"
                    type="submit"
                >
                   Sign Up
                </button>
            </form>
        </section>
    )
}  