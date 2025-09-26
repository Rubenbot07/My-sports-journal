import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"
import { AuthLayout } from "@/components/layout/AuthLayout"

export const ForgotPassword = () => {
    return (
        <AuthLayout>
            <ForgotPasswordForm />
        </AuthLayout>
    )
}