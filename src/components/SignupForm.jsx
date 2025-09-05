import { useState, useTransition } from "react";
import { signUp } from "@/services/authService";
import { Link } from "react-router-dom";
import { useSignUp } from "@/hooks/useSignup";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const { handleSignUp, isLoading, error, isPending } = useSignUp();
  //   const router = useRouter();
//   const fetchUser = useUserStore.getState().fetchUser;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username)
    handleSignUp({ email, password, repeatPassword, username });
  };

  return (
    <form
        className="border-primary z-10 relative md:translate-y-1/5 flex flex-col gap-4 w-full min-w-80  md:w-lg bg-white border-1 md:border-gray-300 shadow-lg p-4 rounded-xl" 
        onSubmit={onSubmit}
    >
        <h1  className="text-3xl font-bold text-primary">User Sign Up</h1>
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
        <div className="flex flex-col gap-1">
            <label
                className="self-start"
                htmlFor="repeat-password"
            >
                Repeat Password
            </label>
            <input
                className="border border-gray-400 rounded-xl p-2"
                required
                type="password"
                id="repeat-password"
                onChange={(e) => setRepeatPassword(e.target.value)}/>
        </div>
        <div className="flex flex-col gap-1">
            <label
                className="self-start"
                htmlFor="repeat-password"
            >
                Username
            </label>
            <input
                className="border border-gray-400 rounded-xl p-2"
                required
                type="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}/>
        </div>
         <p className="mt-4 text-center text-sm flex items-center justify-center gap-2">
           Already have an account? 
           <Link to="/login" className="underline hover:text-blue-600">
             Log In
           </Link>
         </p>
        {error && 
            <p className="text-red-500 bg-red-200 rounded-xl p-2">{error}</p>
        }
        <button 
            className="bg-primary cursor-pointer rounded-xl text-amber-50 w-1/2 p-2 mx-auto"
            type="submit"
        >
            {isLoading || isPending ? 'Signing Up...' : 'Sign Up'}
        </button>
    </form>
    // <section
    //   aria-labelledby="signup-title"
    //   className="max-w-md mx-auto border border-gray-200 rounded-lg p-6"
    // >
    //   <h1 id="signup-title" className="text-2xl font-semibold mb-2">
    //     Sign Up
    //   </h1>
    //   <p className="text-sm text-gray-600 mb-6">Create an account</p>

    //   {/* <form onSubmit={handleSignUp} noValidate>
    //     <div className="flex flex-col gap-6">
    //       <div>
    //         <label htmlFor="email" className="block text-sm font-medium">
    //           Email
    //         </label>
    //         <input
    //           id="email"
    //           type="email"
    //           placeholder="m@example.com"
    //           required
    //           autoComplete="email"
    //           aria-required="true"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="w-full mt-1 p-2 border border-gray-300 rounded-md"
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="password" className="block text-sm font-medium">
    //           Password
    //         </label>
    //         <input
    //           id="password"
    //           type="password"
    //           required
    //           autoComplete="new-password"
    //           aria-required="true"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="w-full mt-1 p-2 border border-gray-300 rounded-md"
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="repeat-password" className="block text-sm font-medium">
    //           Repeat Password
    //         </label>
    //         <input
    //           id="repeat-password"
    //           type="password"
    //           required
    //           autoComplete="new-password"
    //           aria-required="true"
    //           value={repeatPassword}
    //           onChange={(e) => setRepeatPassword(e.target.value)}
    //           className="w-full mt-1 p-2 border border-gray-300 rounded-md"
    //         />
    //       </div>

    //       {error && (
    //         <p className="text-sm text-red-600" role="alert">
    //           {error}
    //         </p>
    //       )}

    //       <button
    //         type="submit"
    //         disabled={isLoading || isPending}
    //         className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-900 disabled:opacity-50"
    //         aria-busy={isLoading || isPending}
    //         aria-disabled={isLoading || isPending}
    //       >
    //         {isLoading || isPending ? "Signing up..." : "Sign Up"}
    //       </button>
    //     </div>

    //     <p className="mt-4 text-center text-sm flex gap-2">
    //       Already have an account? 
    //       <Link href="/auth/login" className="underline hover:text-blue-600">
    //         Log In
    //       </Link>
    //     </p>
    //   </form> */}
    
    // </section>
  );
}