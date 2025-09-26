import { NavLink } from "react-router-dom"
import { LogOut, UserRoundPlus } from "lucide-react"
export const AuthOptions = ({ handleLogout, profileUser }) => {
    return (
        <>
            <li >
                    {
                        profileUser ? (
                            <ul className="flex gap-2 font-semibold">
                                <li className="flex items-center">
                                    {profileUser?.display_name ? profileUser.display_name : profileUser?.email}
                                </li>
                                <li>
                                    <button
                                        aria-label="Log out"
                                        className="cursor-pointer p-1 hover:bg-red-800 rounded-2xl" onClick={handleLogout}>
                                        <LogOut />
                                    </button>
                                </li>                        
                            </ul>
                        ) : (
                            <ul className="flex gap-2 font-semibold items-center">
                                <li className="w-10 p-1">
                                    <NavLink to="/login" aria-label="Log in">
                                        <UserRoundPlus />
                                    </NavLink>
                                </li>
                                <li 
                                    aria-label="Subscribe"
                                    className="bg-white p-1 cursor-pointer text-primary rounded-sm hover:bg-primary hover:text-white">
                                    <NavLink to="/register">Subscribe</NavLink>
                                </li>
                            </ul>
                        )
                    }
                </li>
        </>
    )
}