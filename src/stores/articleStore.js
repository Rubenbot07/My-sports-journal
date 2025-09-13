import { create } from "zustand";

export const useArticleStore = create((set) => ({
    articles: [],
    article: null,
    setArticle: (article) => set({ article }),
    setArticles: (articles) => set({ articles }),
    isSaved: false,
    setIsSaved: (isSaved) => set({ isSaved }),
    removeArticle: (id) =>
    set((state) => ({
      articles: state.articles.filter((a) => a.id !== id),
    })),
}));