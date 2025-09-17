import { useState } from 'react';
export const ArticleHeroImage = ({ article }) => {

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    return (
        <picture className={`col-span-3 overflow-hidden relative rounded-xl ${isImageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            <source media="(min-width: 1024px)" srcSet={`${article?.media.find((img) => img.role === 'banner')?.url}`} />
                    <source media="(min-width: 640px)" srcSet={`${article?.media.find((img) => img.role === 'cover')?.url}`} />
                    <source media="(max-width: 639px)" srcSet={`${article?.media.find((img) => img.role === 'thumbnail')?.url}`} />
            <img 
                src={article?.media.find((img) => img.role === 'thumbnail')?.url}
                alt={article?.title} 
                onLoad={handleImageLoad}
                className='w-full h-full md:object-cover object-fill' />
        </picture>
    );
};