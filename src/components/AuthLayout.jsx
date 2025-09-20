export const AuthLayout = ({ children }) => {
    return (
        <div>
            <section className="flex flex-col gap-8 max-w-[1500px] mx-auto w-full p-4 flex-1 md:min-h-[700px]">
                <div className="flex flex-col items-center relative rounded-xl w-full md:bg-[url('https://pqbzzgeczhqphepwilwv.supabase.co/storage/v1/object/public/company%20images/authWallpaper.webp')] bg-cover bg-center md:max-h-96">
                    <span className="hidden md:block bg-primary/50 rounded-xl z-10 absolute w-full h-auto top-0 left-0 right-0 bottom-0"></span>
                    {children}
                </div>
        
            </section>
        </div>
    );
}