import { useState } from "react";
import { useArticleStore } from "@/stores/articleStore";
import { useArticlesManage } from "@/hooks/useArticlesManage";
import { useNavigate } from "react-router-dom";
export const EditArticleForm = () => {
  const article = useArticleStore((state) => state.article);
  const { updateArticleHandler } = useArticlesManage();
  const [title, setTitle] = useState(article?.title || "");
  const [content, setContent] = useState(article?.content_markdown || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateArticleHandler(article.id, {
        title,
        content_markdown: content,
        status: "in_review",
      });
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to update article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="text-center w-full mx-auto flex flex-col gap-8 h-10/12 overflow-y-scroll"
      aria-labelledby="edit-article-title"
    >
      <h2 id="edit-article-title" className="sr-only">
        Edit Article
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full min-w-7/8 mx-auto p-4"
      >
        {/* Title */}
        <label htmlFor="title" className="font-semibold text-left">
          Edit Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="border border-primary rounded-md p-2 bg-white"
          aria-required="true"
        />

        {/* Content */}
        <label htmlFor="content" className="font-semibold text-left">
          Edit Content
        </label>
        <textarea
          id="content"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          className="border border-primary rounded-md p-2 bg-white h-48"
          aria-required="true"
        />

        {/* Submit */}
        <button
          className="bg-primary text-white p-2 rounded-lg disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>

        {/* Error */}
        {error && (
          <p role="alert" className="text-red-500">
            {error}
          </p>
        )}
      </form>
    </section>
  );
};