import { LoginForm } from "@/components/auth/LogInForm"
import { AuthLayout } from "@/components/layout/AuthLayout"
export const Login = () => {

    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    )
}