import { ForgotPasswordForm } from "@/components/ForgotPasswordForm"
import { AuthLayout } from "@/components/AuthLayout"

export const ForgotPassword = () => {
    return (
        <AuthLayout>
            <ForgotPasswordForm />
        </AuthLayout>
    )
}