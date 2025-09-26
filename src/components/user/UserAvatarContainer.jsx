import { Pencil } from 'lucide-react'
import { UploadPhotoForm } from '@/components/user/UploadPhotoForm'
import { Modal } from '@/components/ui/Modal'

export const UserAvatarContainer = ({ currentUser, isOwner, isOpenPhoto, setIsOpenPhoto }) => {
    return (
        <section>
            <div className="w-40 h-40 absolute -top-14 left-1/2 -translate-x-1/2 rounded-full border-4 border-primary bg-gray-300 overflow-hidden mx-auto">
                <img
                    src={currentUser?.avatar_url || 'https://pqbzzgeczhqphepwilwv.supabase.co/storage/v1/object/public/company%20images/defaultAvatar.webp'}
                    alt={currentUser?.display_name}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {isOwner && (
                <>
                    <div className="w-50 h-50 absolute -top-14 left-1/2 -translate-x-1/2 rounded-full bg-transparent overflow-hidden mx-auto">
                        <button
                            onClick={() => setIsOpenPhoto(true)}
                            className="absolute bottom-10 right-8 bg-white text-primary p-1 rounded-full border-2 border-primary"
                        >
                            <Pencil />
                        </button>
                    </div>

                    <Modal isOpen={isOpenPhoto} onClose={() => setIsOpenPhoto(false)}>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold text-center">Upload Profile Picture</h2>
                            <UploadPhotoForm
                                userId={currentUser?.id}
                                oldPath={currentUser?.avatar_path}
                            />
                        </div>
                    </Modal>
                </>
            )}
        </section>
    );
};