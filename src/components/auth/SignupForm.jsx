import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "@/hooks/useSignup";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const { handleSignUp, isLoading, error, isPending } = useSignUp();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSignUp({ email, password, repeatPassword, username });
  };

  return (
    <form
      className="border-primary z-10 relative md:translate-y-1/5 flex flex-col gap-4 w-full min-w-80 md:w-lg bg-white border-1 md:border-gray-300 shadow-lg p-4 rounded-xl"
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="signup-title"
    >
      <h1 id="signup-title" className="text-3xl font-bold text-primary">
        User Sign Up
      </h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="signup-email" className="self-start">Email</label>
        <input
          required
          type="email"
          id="signup-email"
          className="border border-gray-400 rounded-xl p-2"
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={error ? "signup-error" : undefined}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="signup-password" className="self-start">Password</label>
        <input
          required
          type="password"
          id="signup-password"
          className="border border-gray-400 rounded-xl p-2"
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby={error ? "signup-error" : undefined}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="signup-repeat-password" className="self-start">Repeat Password</label>
        <input
          required
          type="password"
          id="signup-repeat-password"
          className="border border-gray-400 rounded-xl p-2"
          onChange={(e) => setRepeatPassword(e.target.value)}
          aria-describedby={error ? "signup-error" : undefined}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="signup-username" className="self-start">Username</label>
        <input
          required
          type="text"
          id="signup-username"
          className="border border-gray-400 rounded-xl p-2"
          onChange={(e) => setUsername(e.target.value)}
          aria-describedby={error ? "signup-error" : undefined}
        />
      </div>

      {error && (
        <p id="signup-error" role="alert" className="text-red-500 bg-red-200 rounded-xl p-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading || isPending}
        className="bg-primary cursor-pointer rounded-xl text-amber-50 w-1/2 p-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading || isPending ? "Signing Up..." : "Sign Up"}
      </button>

      <p className="mt-4 text-center text-sm flex items-center justify-center gap-2">
        Already have an account?
        <Link to="/login" className="underline hover:text-blue-600">
          Log In
        </Link>
      </p>
    </form>
  );
}