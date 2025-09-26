import { AuthLayout } from "@/components/layout/AuthLayout";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";
export const UpdatePassword = () => {
    return (
        <AuthLayout>
            <UpdatePasswordForm />
        </AuthLayout>
    )
};