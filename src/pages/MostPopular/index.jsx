import { ArticlesGalleryLayout } from '../../components/ArticlesGalleryLayout';
import { getMostBookmarkedArticles } from '@/services/getMostPopularArticles';
import { useEffect, useState } from 'react';
export const MostPopular = () => {
    const [mostPopular, setMostPopular] = useState([]);
    useEffect(() => {
        const fetchMostPopular = async () => {
            try {
                const data = await getMostBookmarkedArticles(6);
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