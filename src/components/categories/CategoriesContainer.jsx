import { NavLink } from "react-router-dom"
import { ChevronDown } from "lucide-react"
export const CategoriesContainer = ({ isCategoriesOpen, setIsCategoriesOpen, categoriesRef }) => {
    return (
        <li ref={categoriesRef} className="relative">
            <button className="flex items-center cursor-pointer" onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
                <span>Categories</span>
                <span className={`transition-all duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown />
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
    )
}