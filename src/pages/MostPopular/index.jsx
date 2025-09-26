import { ArticlesGalleryLayout } from '@/components/articles/ArticlesGalleryLayout';
import { getMostBookmarkedArticles } from '@/services/articlesService';
import { useEffect, useState } from 'react';
export const MostPopular = () => {
    const [mostPopular, setMostPopular] = useState([]);
    useEffect(() => {
        const fetchMostPopular = async () => {
            try {
                const data = await getMostBookmarkedArticles(10);
                setMostPopular(data);
            } catch (error) {
                console.error('Error fetching most popular articles:', error);
            }
        };
        fetchMostPopular();
    }, []);
    return (
        <ArticlesGalleryLayout title='Most Popular' articles={mostPopular} />
    )
}