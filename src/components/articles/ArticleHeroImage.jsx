import { useState } from 'react';
export const ArticleHeroImage = ({ article, title }) => {
  const banner = article?.media.find((img) => img.role === "banner");
  const cover = article?.media.find((img) => img.role === "cover");
  const thumb = article?.media.find((img) => img.role === "thumbnail");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const fallbackUrl = 'https://pqbzzgeczhqphepwilwv.supabase.co/storage/v1/object/public/company%20images/imageNotFound.png'; // Default image URL

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <figure 
      className={`col-span-3 overflow-hidden relative rounded-xl 
                  ${isImageLoaded ? 'opacity-100' : 'opacity-0'} 
                  transition-opacity duration-500`}
      aria-busy={!isImageLoaded}
    >
      <picture>
        <source media="(min-width: 1024px)" srcSet={banner?.url || fallbackUrl} />
        <source media="(min-width: 640px)" srcSet={cover?.url || fallbackUrl} />
        <source media="(max-width: 639px)" srcSet={thumb?.url || fallbackUrl} />
        <img
          src={thumb?.url || fallbackUrl}
          alt={title ? "" : article?.title} 
          onLoad={handleImageLoad}
          className="w-full h-full md:object-cover object-fill"
        />
      </picture>

      {title && (
        <figcaption className="absolute bg-blue-800/60 bottom-0 left-0 p-2 text-center text-lg md:text-3xl md:p-4 text-white font-bold w-full">
          <p>{article?.title}</p>
        </figcaption>
      )}
    </figure>
  );
};