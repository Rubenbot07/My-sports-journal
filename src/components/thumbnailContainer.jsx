export const ThumbnailContainer = ({ article, isSingle }) => {
    return (
        <div className={`w-full md:w-2/4 md:min-w-70 rounded-2xl overflow-hidden h-[140px] 2sm:h-[180px] md:h-[200px] ${isSingle ? 'lg:h-[300px]' : ''}`}>
            <picture className="rounded-lg overflow-hidden md:w-2/3 lg:w-1/2 max-h-96">
                <source media="(min-width: 1024px)" srcSet={`${article?.media.find((img) => img.role === 'banner')?.url}`} />
                <source media="(min-width: 640px)" srcSet={`${article?.media.find((img) => img.role === 'cover')?.url}`} />
                <source media="(max-width: 639px)" srcSet={`${article?.media.find((img) => img.role === 'thumbnail')?.url}`} />
                <img  src={article?.media.find((img) => img.role === 'thumbnail')} alt={article?.title} className='w-full h-full object-cover object-top hover:scale-105 transition-all duration-500 ' />
            </picture>
        </div>
    )
}