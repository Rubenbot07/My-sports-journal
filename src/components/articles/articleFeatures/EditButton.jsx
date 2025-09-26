import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { EditArticleForm } from "@/components/articles/forms/EditArticleForm";
export const EditButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleModal = () => {
        setIsOpen(!isOpen);
        
    };

    return (
        <div>
            <button  onClick={toggleModal} className='bg-primary cursor-pointer text-white p-2 rounded-lg min-w-32 max-w-56'>
                Edit
            </button>
            <Modal isOpen={isOpen} onClose={toggleModal} >
                <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl font-semibold text-center'>Edit your article</h2>
                    <EditArticleForm />
                </div>
            </Modal>
        </div>
    );
}