import { NavLink } from "react-router-dom"
import { useAuth } from "../context/UserContext"

export const Nav = () => {
    const auth = useAuth()
    return (
        <nav className="bg-amber-300 flex justify-between">
            <ul className="flex gap-4 p-4">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/most-popular">Most Popular</NavLink>
                </li>
                {
                    auth.user && (
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                    )
                }
                <li>
                    <NavLink to="/favorites">Favorites</NavLink>
                </li>
            </ul>
            <ul className="flex gap-4 p-4">
                {
                    auth.user ? (
                        <>
                            <li>
                                {auth.user}
                            </li>
                            <li>
                                <button onClick={auth.logout}>Logout</button>
                            </li>                        
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup">Sign Up</NavLink>
                            </li>
                        </>
                    )
                }
                
            </ul>
        </nav>
    )
}