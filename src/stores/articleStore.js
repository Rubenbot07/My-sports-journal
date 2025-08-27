import { create } from "zustand";
import { getArticles } from "@/services/getArticles";

export const useArticleStore = create((set) => ({
    articles: [],
    fetchArticles: async () => {
        try {
            const articles = await getArticles();
            set({ articles });
        } catch (error) {
            console.error("Failed to fetch articles:", error);
        }
    }
}));