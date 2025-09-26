import { DeleteButton } from "@/components/articles/articleFeatures/DeleteButton";
import { EditButton } from "@/components/articles/articleFeatures/EditButton";
export const ArticleHandler = ({ articleId, roles, userId, setRemoveArticle }) => {

  return (
    <div
      className="flex flex-col 2sm:col-span-3 p-4 gap-4 w-full 2sm:flex-row justify-center md:justify-start items-start"
      role="group"
      aria-label="Article actions"
    >
      {roles?.includes('admin') && (
        <>
          <DeleteButton articleId={articleId} userId={userId} setRemoveArticle={setRemoveArticle} />
          <EditButton />
        </>
      )}

      {(roles?.includes('editor') || roles === 'editor') && (
        <EditButton />
      )}
    </div>
  );
};
