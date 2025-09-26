import { NavLink } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useUserStore } from "@/stores/userStore"
import { useAuthSession } from "@/hooks/useAuthSession"
import { useNavigate } from "react-router-dom"
import { CategoriesContainer } from "@/components/categories/CategoriesContainer"
import { NavOptions } from "@/components/layout/NavOptions"
import { AuthOptions } from "@/components/auth/AuthOptions"


export const Nav = () => {
    const { logout } = useAuthSession()
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const categoriesRef = useRef(null)
    const authUser = useUserStore((state) => state.authUser);
    const profileUser = useUserStore((state) => state.user);
    const roles = useUserStore((state) => state.roles).map(r => r.name);

    const navigate = useNavigate();
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

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (err) {
            console.error(err)
        }
    }
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
                            <img aria-label="Sports Journal" className="overflow-hidden" src='https://pqbzzgeczhqphepwilwv.supabase.co/storage/v1/object/public/company%20images/sportsJournalLogo.png' alt="Sports Journal Logo" />
                        </NavLink>
                    </div>
                </li>
                <AuthOptions handleLogout={handleLogout} profileUser={profileUser} />
            </ul>
            <ul className={`z-50 gap-8 p-4 w-1/2 rounded-br-2xl absolute top-14 ${isMenuOpen ? 'flex transition-transform duration-300 ease-in translate-x-0' : 'flex transition-transform -translate-x-full duration-300 ease-in'} md:relative md:top-0 md:flex flex-col md:translate-x-0 md:flex-row md:items-center bg-white shadow-md font-semibold md:gap-4 md:w-full md:rounded-b-none`}>
                <NavOptions authUser={authUser} roles={roles} />
                <CategoriesContainer isCategoriesOpen={isCategoriesOpen} setIsCategoriesOpen={setIsCategoriesOpen} categoriesRef={categoriesRef} />
            </ul>
        </nav>
    )
}