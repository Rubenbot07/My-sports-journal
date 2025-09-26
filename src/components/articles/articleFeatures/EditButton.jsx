import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { EditArticleForm } from "@/components/articles/forms/EditArticleForm";
export const EditButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <button
        type="button"
        onClick={toggleModal}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="edit-article-modal"
        className="bg-primary flex justify-center items-center gap-2
                   cursor-pointer text-white p-2 rounded-lg min-w-32 max-w-56"
      >
        <span>Edit</span>
        <SquarePen className="inline-block" size={20} aria-hidden="true" />
      </button>

      <Modal
        id="edit-article-modal"
        isOpen={isOpen}
        onClose={toggleModal}
        aria-labelledby="edit-article-title"
      >
        <div className="flex flex-col gap-4">
          <h2 id="edit-article-title" className="text-2xl font-semibold text-center">
            Edit your article
          </h2>
          <EditArticleForm />
        </div>
      </Modal>
    </div>
  );
};