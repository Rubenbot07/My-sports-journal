export const AuthLayout = ({ children }) => {
    return (
        <main className="flex flex-col gap-8 max-w-[1500px] mx-auto w-full p-4 flex-1 md:min-h-[700px]">
            <div className="flex flex-col items-center relative rounded-xl w-full md:bg-[url('https://pqbzzgeczhqphepwilwv.supabase.co/storage/v1/object/public/company%20images/authWallpaper.webp')] bg-cover bg-center md:max-h-96">
                
                {/* Overlay decorativo, ignorado por screen readers */}
                <span 
                    className="hidden md:block bg-primary/50 rounded-xl z-10 absolute w-full h-full top-0 left-0" 
                    aria-hidden="true"
                ></span>
                
                {children}
            </div>
        </main>
    );
}