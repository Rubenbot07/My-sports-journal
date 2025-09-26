export const ThumbnailContainer = ({ article, isSingle }) => {
    const banner = article?.media.find((img) => img.role === "banner");
    const cover = article?.media.find((img) => img.role === "cover");
    const thumb = article?.media.find((img) => img.role === "thumbnail");

    const fallbackUrl = 'https://pqbzzgeczhqphepwilwv.supabase.co/storage/v1/object/public/company%20images/imageNotFound.png'; // Cambia esto por una imagen por defecto

    return (
        <div className={`w-full md:w-2/4 md:min-w-70 rounded-2xl overflow-hidden h-[140px] 2sm:h-[180px] md:h-[200px] ${isSingle ? 'lg:h-[300px]' : ''}`}>
            <picture className="rounded-lg overflow-hidden md:w-2/3 lg:w-1/2 max-h-96">
                <source media="(min-width: 1024px)" srcSet={banner?.url || fallbackUrl} />
                <source media="(min-width: 640px)" srcSet={cover?.url || fallbackUrl} />
                <source media="(max-width: 639px)" srcSet={thumb?.url || fallbackUrl} />
                <img
                    src={thumb?.url || fallbackUrl}
                    alt={`Thumbnail of ${article?.title || 'article'}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-500"
                />
            </picture>
        </div>
    );
}