export const ArticleHeroBanner = ({ title }) => {
    return (
        <h1
            className={`relative font-bold text-4xl text-white col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 min-h-20 flex items-center justify-center bg-primary bg-cover bg-center`}>
                {title}
        </h1>
    )
}