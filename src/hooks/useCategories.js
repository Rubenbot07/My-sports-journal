import { getCategoriesById, getCategoryBySlug, getAllCategories } from "@/services/categoriesService";
import { useState, useCallback } from "react";
export const useCategories = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    const fetchAllCategories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);


    const fetchCategoriesById = async (categoryId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCategoriesById(categoryId);
            return data
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategoriesBySlug = useCallback(async (slug) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCategoryBySlug(slug);
            return data
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { categories, loading, error, fetchCategoriesById, fetchCategoriesBySlug, fetchAllCategories };
}