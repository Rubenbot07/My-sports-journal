import { NavLink } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import Logo from '../assets/sportsJournalLogo.png'
import { ChevronSVG } from "../assets/icons/ChevronSVG"
import { LogOutSVG } from "../assets/icons/LogOutSVG"
import { LogInSVG } from "../assets/icons/LogInSVG"
import { useUserStore } from "@/stores/userStore"
import { useLogout } from "@/hooks/useLogout" 


export const Nav = () => {
    const { logout } = useLogout()
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const categoriesRef = useRef(null)
    const authUser = useUserStore((state) => state.authUser);
    const profileUser = useUserStore((state) => state.user);
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <nav className=" flex flex-col justify-between">
            <ul className="flex justify-between gap-4 p-2 items-center bg-primary text-white">
                <li className="flex items-center">
                    <button
                            aria-label="Menu"
                            className="flex flex-col justify-between w-6 h-6 md:hidden focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <span
                                className={`block h-1 bg-white transition-transform duration-300 ${
                                    isMenuOpen ? "rotate-45 translate-y-3" : ""
                                }`}
                            ></span>
                            <span
                                className={`block h-1 bg-white transition-opacity duration-300 ${
                                    isMenuOpen ? "opacity-0" : ""
                                }`}
                            ></span>
                            <span
                                className={`block h-1 bg-white transition-transform duration-300 ${
                                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                                }`}
                            ></span>
                        </button>
                    <div className="w-28 h-3.5 flex items-center">
                        <NavLink to="/">
                            <img aria-label="Sports Journal" className="overflow-hidden" src={Logo} alt="Sports Journal Logo" />
                        </NavLink>
                    </div>
                </li>
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
                                        className="cursor-pointer p-1 hover:bg-red-800 rounded-2xl" onClick={logout}>
                                        <LogOutSVG />
                                    </button>
                                </li>                        
                            </ul>
                        ) : (
                            <ul className="flex gap-2 font-semibold items-center">
                                <li className="w-10 p-1">
                                    <NavLink to="/login" aria-label="Log in">
                                        <LogInSVG />
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
            </ul>
            <ul className={`z-50 gap-8 p-4 w-1/2 rounded-br-2xl absolute top-14 ${isMenuOpen ? 'flex transition-transform duration-300 ease-in translate-x-0' : 'flex transition-transform -translate-x-full duration-300 ease-in'} md:relative md:top-0 md:flex flex-col md:translate-x-0 md:flex-row md:items-center bg-white shadow-md font-semibold md:gap-4 md:w-full md:rounded-b-none`}>
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
                <li ref={categoriesRef} className="relative">
                    <button className="flex items-center cursor-pointer" onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
                        <span>Categories</span>
                        <span className={`transition-all duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`}>
                            <ChevronSVG />
                        </span>
                    </button>
                        <ul className={`${isCategoriesOpen ? 'flex' : 'hidden' } flex-col  gap-4 md:absolute p-2 md:flex-row md:bg-gray-10000 md:top-10 md:shadow-md md:rounded-b-md md:gap-8 bg-white`}>
                            <li className="border-b-1 border-gray-800 md:border-none">
                                <NavLink to="/category/soccer">Soccer</NavLink>
                            </li>
                            <li className="border-b-1 border-gray-800 md:border-none">
                                <NavLink to="/category/football">Football</NavLink>
                            </li>
                            <li className="border-b-1 border-gray-800 md:border-none">
                                <NavLink to="/category/esports">Esports</NavLink>
                            </li>
                            <li className="border-b-1 border-gray-800 md:border-none">
                                <NavLink to="/category/tennis">Tennis</NavLink>
                            </li>
                            <li className="border-b-1 border-gray-800 md:border-none">
                                <NavLink to="/category/basketball">Basketball</NavLink>
                            </li>
                        </ul>
                </li>
            </ul>
        </nav>
    )
}