import { SignUpForm } from "@/components/auth/SignupForm";
import { AuthLayout } from "@/components/layout/AuthLayout";

export function SignUp() {
    return (
        <AuthLayout>
            <SignUpForm />
        </AuthLayout>
    );
}