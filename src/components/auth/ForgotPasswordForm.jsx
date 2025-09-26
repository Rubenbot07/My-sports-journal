import { Link } from "react-router-dom"
import { useState } from "react"
import { usePassword } from "@/hooks/usePassword"
import { Mail } from "lucide-react"
export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const { handleResetPassword, loading, error, success } = usePassword();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await handleResetPassword(email);
  };

  return (
    <section aria-labelledby="reset-title">
      {success ? (
        <div
          role="alert"
          aria-live="polite"
          className="border-primary z-10 relative md:translate-y-1/5 flex flex-col items-center justify-center gap-4 w-full min-w-80 md:w-lg bg-white border-1 md:border-gray-300 shadow-lg p-8 rounded-xl h-64"
        >
          <h2 id="reset-title" className="text-2xl font-semibold">
            Check your email
          </h2>
          <Mail className="w-16 h-16 text-primary" />
          <p className="text-md text-gray-600">
            If your account exists, we’ve sent password reset instructions to your email.
          </p>
        </div>
      ) : (
        <form
          className="border-primary z-10 relative md:translate-y-1/5 flex flex-col gap-4 w-full min-w-80 md:w-lg bg-white border-1 md:border-gray-300 shadow-lg p-4 rounded-xl"
          onSubmit={handleForgotPassword}
          noValidate
        >
          <h1 id="reset-title" className="text-3xl font-bold text-primary">
            Reset your Password
          </h1>
          <p className="text-md text-center max-w-md">
            Enter your email and we’ll send you a link to reset your password.
          </p>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="self-start">
              Email
            </label>
            <input
              required
              className="border border-gray-400 rounded-xl p-2"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby={error ? 'email-error' : undefined}
            />
          </div>

          {error && (
            <p
              id="email-error"
              role="alert"
              className="text-red-500 bg-red-200 rounded-xl p-2"
            >
              {error.message}
            </p>
          )}

          <button
            className="bg-primary cursor-pointer rounded-xl text-amber-50 w-1/2 p-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>

          <p className="mt-4 text-center text-sm flex items-center justify-center gap-2">
            Already have an account?
            <Link to="/login" className="underline hover:text-blue-600">
              Log In
            </Link>
          </p>
        </form>
      )}
    </section>
  );
};