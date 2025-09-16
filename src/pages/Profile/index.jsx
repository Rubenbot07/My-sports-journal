import { useUserStore } from '@/stores/userStore'
import { useProfile } from '@/hooks/useProfile'
import { useParams } from 'react-router'
import { useState} from 'react'
import { UserAvatarContainer } from '@/components/UserAvatarContainer'
import { UserInfoContainer } from '@/components/UserInfoContainer'
import { EditButtonContainer } from '@/components/EditButtonContainer'
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
                <UserAvatarContainer currentUser={currentUser} isOwner={isOwner} isOpenPhoto={isOpenPhoto} setIsOpenPhoto={setIsOpenPhoto} />
                <UserInfoContainer currentUser={currentUser} roles={roles} isOwner={isOwner} />
            </section>
            <EditButtonContainer currentUser={currentUser} isOwner={isOwner} isOpenEdit={isOpenEdit} setIsOpenEdit={setIsOpenEdit} />
        </section>
    )
}