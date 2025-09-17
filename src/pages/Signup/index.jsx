import { SignUpForm } from "@/components/SignupForm";
import { AuthLayout } from "@/components/AuthLayout";

export function SignUp() {
    return (
        <AuthLayout>
            <SignUpForm />
        </AuthLayout>
    );
}