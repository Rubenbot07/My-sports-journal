import { useUserStore } from '@/stores/userStore'
import { useProfile } from '@/hooks/useProfile'
import { useParams } from 'react-router'
import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { EditProfileForm } from '@/components/EditProfileForm'

export const Profile = () => {
    const { user, roles } = useUserStore()
    const { userEmail } = useParams();
    const { profile, loading } = useProfile(userEmail)
    const [isOpen, setIsOpen] = useState(false);
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
                    <img src={profile?.avatar_url ? profile?.avatar_url : '/src/assets/defaultAvatar.webp'} alt={profile?.display_name} className='w-full h-full' />
                </div>
                <p className='text-xl font-bold text-white'>{profile?.display_name}</p>
                <div className='flex flex-col justify-around text-lg text-white'>
                    <span>{profile?.email}</span>
                </div>
                    <>
                        <div className='flex flex-col justify-around px-4 text-lg text-white'>
                            <span>{profile?.bio}</span>
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
            <div>
            <button className='bg-primary text-white py-2 px-4 rounded-lg' onClick={() => setIsOpen(true)}>Edit Profile</button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl font-semibold text-center'>Edit your profile</h2>
                    <EditProfileForm onClose={setIsOpen} userId={profile?.id} userName={profile?.display_name} userBio={profile?.bio}/>
                </div>
            </Modal>
            </div>
        </section>
    )
}