import { ArticleHeroBanner } from '@/components/articles/ArticleHeroBanner';
import { useCategories } from '@/hooks/useCategories';
import { useArticlesManage } from '@/hooks/useArticlesManage';
import { useEffect, useState } from 'react';
import { slugGenerator } from '@/utils/slugGenerator';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';

export const CreateArticleForm = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { categories, fetchAllCategories } = useCategories();
  const { createArticleHandler } = useArticlesManage();
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = slugGenerator(title);

    const data = {
      title,
      content_markdown: content,
      excerpt,
      slug,
      categoryId: category,
      status: "in_review",
      author_id: user.id,
    };

    try {
      setLoading(true);
      const { createdData, error } = await createArticleHandler(data);
      if (error) {
        setError(error);
        return;
      }
      navigate(`/upload-images/${createdData[0].id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  return (
    <section>
      <ArticleHeroBanner title={"Create Article"} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full h-svh border border-gray-400 p-4"
        aria-labelledby="form-title"
      >
        <h2 id="form-title" className="text-xl font-semibold mb-2">
          New Article
        </h2>

        <label htmlFor="title">Title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          required
          type="text"
          name="title"
          id="title"
          value={title}
          className="border border-gray-400 p-2 rounded"
          aria-required="true"
        />

        <label htmlFor="content">Content</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          required
          name="content"
          id="content"
          value={content}
          className="border border-gray-400 p-2 rounded h-1/2"
          aria-required="true"
        ></textarea>

        <label htmlFor="excerpt">Excerpt</label>
        <textarea
          onChange={(e) => setExcerpt(e.target.value)}
          name="excerpt"
          id="excerpt"
          value={excerpt}
          className="border border-gray-400 p-2 rounded h-1/4"
        ></textarea>

        <label htmlFor="select-category">Category</label>
        <select
          className="border border-gray-400 p-2 rounded"
          required
          name="category"
          id="select-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-required="true"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-primary cursor-pointer rounded-xl text-amber-50 w-1/2 p-2 mx-auto disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>

        {error && (
          <p role="alert" className="text-red-600">
            {error}
          </p>
        )}
      </form>
    </section>
  );
};