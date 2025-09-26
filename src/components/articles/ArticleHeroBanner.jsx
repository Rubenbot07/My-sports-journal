export const ArticleHeroBanner = ({ title }) => {
  return (
    <h1
      className="relative font-bold text-2xl sm:text-3xl md:text-4xl text-white text-center col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 min-h-12 flex items-center justify-center bg-primary px-4"
    >
      {title}
    </h1>
  );
};