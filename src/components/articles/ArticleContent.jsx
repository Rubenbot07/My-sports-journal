import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

export const ArticleContent = ({ content }) => {
  return (
    <article 
      className="col-span-3 overflow-hidden relative rounded-xl"
      aria-label="Article content"
    >
      <div className="p-4 text-lg whitespace-pre-line text-left leading-relaxed">
        <MarkdownRenderer content={content} />
      </div>
    </article>
  );
}