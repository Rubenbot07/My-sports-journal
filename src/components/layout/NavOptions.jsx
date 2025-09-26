import { NavLink } from "react-router-dom"
export const NavOptions = ({ authUser, roles }) => {
    return (
        <>
            <li className="hover:text-primary">
                <NavLink to="/" className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>Home</NavLink>
            </li>
            <li className="hover:text-primary">
                <NavLink to="/about" className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>About</NavLink>
            </li>
            <li className="hover:text-primary">
                <NavLink to="/most-popular" className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>Most Popular</NavLink>
            </li>
            {
                authUser && (
                    <li className="hover:text-primary">
                        <NavLink to={`/profile/${authUser.email}`} className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>Profile</NavLink>
                    </li>
                )
            }
            <li className="hover:text-primary">
                <NavLink to="/favorites" className={({ isActive }) => isActive ? 'border-b-2 border-primary' : ''}>Favorites</NavLink>
            </li>
            {
                roles.includes('author') && (
                    <li
                        aria-label="Add article"
                        className="hover:text-primary"
                    >
                        <NavLink to="/create-article">Create Article</NavLink>
                    </li>
                )
            }
        </>
    )
}