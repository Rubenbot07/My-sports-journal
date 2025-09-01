import { create } from "zustand";

export const useArticleStore = create((set) => ({
    articles: [],
    article: null,
    setArticle: (article) => set({ article }),
    setArticles: (articles) => set({ articles }),
}));