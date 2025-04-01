import { useAuth } from '../../context/UserContext'
import { useParams } from 'react-router-dom'
export const Profile = () => {
    const auth = useAuth()
    const { userName } = useParams();
    const profileInfo = auth.users.find(user => user.name === userName);
    return (
        <section className='text-center w-5/6 mx-auto flex flex-col gap-8'>
            <h1 className='text-2xl font-bold bg-blue-500'>Profile</h1>
            <p className='bg-gray-300 p-4 text-lg'>{profileInfo.name}</p>
            <p className='bg-gray-300 p-4 text-lg'>{profileInfo.email}</p>

            {
                auth.user && (
                    <p className='bg-gray-300 p-4 text-lg'>{profileInfo.role}</p>
                )
            }
        </section>
    )
}