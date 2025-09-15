import { useUserStore } from '@/stores/userStore'
import { useProfile } from '@/hooks/useProfile'
import { useParams } from 'react-router'
import { useState} from 'react'
import { Modal } from '@/components/Modal'
import { EditProfileForm } from '@/components/EditProfileForm'
import { UploadPhotoForm } from '@/components/UploadPhotoForm'
import { Pencil } from 'lucide-react'

export const Profile = () => {
    const { user, roles } = useUserStore()
    const { userEmail } = useParams();
    const { profile, loading } = useProfile(userEmail)
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenPhoto, setIsOpenPhoto] = useState(false);
    const isOwner = profile?.id === user?.id;
    const currentUser = isOwner ? user : profile;

    if (loading) return <h1>Loading...</h1>;

    return (
        <section className='text-center w-full max-w-[1500px] mx-auto flex flex-col gap-8'>
            <h1
                className={`relative font-bold text-4xl text-white col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 h-20 flex items-center justify-center bg-[url("https://t3.ftcdn.net/jpg/02/71/29/58/360_F_271295864_yiioni2LZXAkdVUs1EP6GdR680QR7iKv.jpg")] bg-cover bg-center`}>
                Profile
            </h1>

            <div className='h-20'></div>
            <section className='relative max-w-[600px] mx-auto min-w-4/4 md:min-w-[600px] bg-primary px-1 rounded-lg flex flex-col gap-2 pt-28 pb-4'> 
                <div className='w-40 h-40 absolute -top-14 left-1/2 -translate-x-1/2 rounded-full border-4 border-primary bg-gray-300 overflow-hidden mx-auto'>
                    <img src={currentUser?.avatar_url ? currentUser?.avatar_url : '/src/assets/defaultAvatar.webp'} alt={profile?.display_name} className='w-full h-full object-cover object-center' />
                </div>
                {isOwner && (            
                    <>
                        <div className='w-50 h-50 absolute -top-14 left-1/2 -translate-x-1/2 rounded-full bg-transparent overflow-hidden mx-auto'>
                        <button onClick={() => setIsOpenPhoto(true)} className='absolute bottom-10 right-8 bg-white text-primary p-1 rounded-full border-2 border-primary'>
                            <Pencil />
                        </button>
                        </div>
                        <Modal isOpen={isOpenPhoto} onClose={() => setIsOpenPhoto(false)}>
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-2xl font-semibold text-center'>Upload Profile Picture</h2>
                            <UploadPhotoForm userId={profile?.id} oldPath={profile?.avatar_path}/>
                        </div>
                        </Modal>
                    </>        
                )}
                <p className='text-xl font-bold text-white'>{currentUser?.display_name}</p>
                <div className='flex flex-col justify-around text-lg text-white'>
                    <span>{currentUser?.email}</span>
                </div>
                    <>
                        <div className='flex flex-col justify-around px-4 text-lg text-white'>
                            <span>{currentUser?.bio}</span>
                        </div>
                        {
                            profile?.id === user?.id && (
                                <div className='flex flex-col justify-around px-4 text-lg text-white'>
                                    <div className='flex gap-1 justify-center'>
                                        <span className='font-bold'>Roles:</span>
                                        {roles?.length > 0 ? (
                                            roles.map((role) => (
                                                <span key={role.id}>{role.name}</span>
                                            ))
                                        ) : (
                                            <span>No roles assigned</span>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    </>
            </section>
            {isOwner &&             
                <div>
                <button className='bg-primary text-white py-2 px-4 rounded-lg' onClick={() => setIsOpenEdit(true)}>Edit Profile</button>

                <Modal isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-2xl font-semibold text-center'>Edit your profile</h2>
                        <EditProfileForm onClose={setIsOpenEdit} userId={profile?.id} userName={profile?.display_name} userBio={profile?.bio}/>
                    </div>
                </Modal>
                </div>
            }
        </section>
    )
}