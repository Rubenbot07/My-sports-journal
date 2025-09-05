import { SignUpForm } from "@/components/SignupForm";

export function SignUp() {
    return (
        <section className="flex flex-col gap-8 max-w-[1500px] mx-auto w-full p-4 flex-1 md:min-h-[700px]">
            <div className="flex flex-col items-center relative rounded-xl w-full md:bg-[url('https://imgs.elpais.com.uy/dims4/default/886e19b/2147483647/strip/true/crop/775x533+12+0/resize/1440x990!/quality/90/?url=https%3A%2F%2Fel-pais-uruguay-production-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fuploads%2F2019%2F02%2F16%2F5c687fc0a5be4.jpeg')] bg-cover bg-center md:max-h-96">
                <span className="hidden md:block bg-primary/50 rounded-xl z-10 absolute w-full h-auto top-0 left-0 right-0 bottom-0"></span>
                <SignUpForm />
            </div>
    
        </section>
    );
}