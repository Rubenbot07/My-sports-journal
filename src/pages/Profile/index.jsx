import { useAuth } from '../../context/UserContext'
import { useParams } from 'react-router-dom'
export const Profile = () => {
    const auth = useAuth()
    const { userName } = useParams();
    const profileInfo = auth.users.find(user => user.name === userName)
    return (
        <section className='text-center w-full max-w-[1500px] mx-auto flex flex-col gap-8'>
            <h1
                className={`relative font-bold text-4xl text-white col-span-1 2sm:col-span-2 md:col-span-1 lg:col-span-2 h-20 flex items-center justify-center bg-[url("https://t3.ftcdn.net/jpg/02/71/29/58/360_F_271295864_yiioni2LZXAkdVUs1EP6GdR680QR7iKv.jpg")] bg-cover bg-center`}>
                Profile
            </h1>
            <div className='h-20'></div>
            <section className='relative max-w-[600px] mx-auto min-w-4/4 md:min-w-[600px] bg-primary px-1 rounded-lg flex flex-col gap-2 pt-28 pb-4'> 
                <div className='w-40 h-40 absolute -top-14 left-1/2 -translate-x-1/2 rounded-full border-4 border-primary bg-gray-300 overflow-hidden mx-auto'>
                    <img src={profileInfo.photo} alt={profileInfo.name} className='w-full h-full' />
                </div>
                <p className='text-xl font-bold text-white'>{profileInfo.name}</p>
                <div className='flex flex-col justify-around text-lg text-white'>
                    <span>{profileInfo.email}</span>
                </div>
                {
                        (auth?.role === 'admin' || auth?.user === profileInfo.name) && (
                        <>
                            <div className='flex flex-col justify-around px-4 text-lg text-white'>
                                <span>{profileInfo.phone}</span>
                            </div>
                            <div className='flex flex-col justify-around px-4 text-lg text-white'>
                                <span>{profileInfo.role}</span>
                            </div>
                        </>
                        )
                }
            </section>
        </section>
    )
}