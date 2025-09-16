import { Modal } from '@/components/Modal'
import { EditProfileForm } from '@/components/EditProfileForm'
export const EditButtonContainer = ({ currentUser, isOwner, isOpenEdit, setIsOpenEdit}) => {
        return (
            <section>
                {isOwner &&             
                    <div>
                    <button className='bg-primary text-white py-2 px-4 rounded-lg' onClick={() => setIsOpenEdit(true)}>Edit Profile</button>
    
                    <Modal isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-2xl font-semibold text-center'>Edit your profile</h2>
                            <EditProfileForm onClose={setIsOpenEdit} userId={currentUser?.id} userName={currentUser?.display_name} userBio={currentUser?.bio}/>
                        </div>
                    </Modal>
                    </div>
                }
            </section>
        )
}