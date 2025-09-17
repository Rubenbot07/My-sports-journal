export const ArticleHeroBanner = ({ articleTitle }) => {
    return (
        <h1
            className={`relative font-bold text-4xl text-white col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 min-h-20 flex items-center justify-center bg-[url("https://t3.ftcdn.net/jpg/02/71/29/58/360_F_271295864_yiioni2LZXAkdVUs1EP6GdR680QR7iKv.jpg")] bg-cover bg-center`}>
                {articleTitle}
        </h1>
    )
}