import { NavLink } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import { useState, useEffect, useRef } from "react"

export const Nav = () => {
    const auth = useAuth()
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
    const categoriesRef = useRef(null)
    const handleClickOutside = (event) => {
        if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
            setIsCategoriesOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

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
                            <NavLink to={`/profile/${auth.user}`}>Profile</NavLink>
                        </li>
                    )
                }
                <li>
                    <NavLink to="/favorites">Favorites</NavLink>
                </li>
                <li ref={categoriesRef}>
                    <button onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
                        Categories
                    </button>
                    {
                        isCategoriesOpen && (
                            <ul className="flex gap-2 absolute bg-amber-500 p-2">
                                <li className="">
                                    <NavLink to="/category/soccer">Soccer</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/category/football">Football</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/category/esports">Esports</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/category/tennis">Tennis</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/category/basketball">Basketball</NavLink>
                                </li>
                            </ul>
                        )
                    }
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
                            <li className="bg-red-500 p-1 text-white rounded-sm">
                                Subscribe
                            </li>
                        </>
                    )
                }
                
            </ul>
        </nav>
    )
}