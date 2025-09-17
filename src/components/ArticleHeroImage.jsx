import { useState } from 'react';
export const ArticleHeroImage = ({ article, title }) => {

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    return (
        <>
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
            {
                title && (
                    <div className='absolute bg-blue-800/60 bottom-0 left-0 p-2 text-center text-lg md:text-3xl md:p-4 text-white font-bold w-full'>
                        <h2 className=''>{article?.title}</h2>
                    </div>
                )
            }
        </>
    );
};