import { useAuth } from '../../context/UserContext'
export const Profile = () => {
    const auth = useAuth()
    return (
        <section className='text-center w-5/6 mx-auto flex flex-col gap-8'>
            <h1 className='text-2xl font-bold bg-blue-500'>Profile</h1>
            <p className='bg-gray-300 p-4 text-lg'>{auth.user}</p>
            <p className='bg-gray-300 p-4 text-lg'>{auth.role}</p>
        </section>
    )
}