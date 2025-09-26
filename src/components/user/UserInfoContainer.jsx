export const UserInfoContainer = ({ currentUser, roles, isOwner }) => {
    return (
        <section>
            <p className='text-xl font-bold text-white'>{currentUser?.display_name}</p>
            <div className='flex flex-col justify-around text-lg text-white'>
                <span>{currentUser?.email}</span>
            </div>
            <div className='flex flex-col justify-around px-4 text-lg text-white'>
                <span>{currentUser?.bio}</span>
            </div>

            {isOwner && (
                <div className='flex flex-col justify-around px-4 text-lg text-white'>
                    <div className='flex gap-1 justify-center'>
                        <span className='font-bold'>Roles:</span>
                        {roles?.length > 0 ? (
                            <ul className="flex gap-1">
                                {roles.map((role) => (
                                    <li key={role.id}>{role.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <span>No roles assigned</span>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}