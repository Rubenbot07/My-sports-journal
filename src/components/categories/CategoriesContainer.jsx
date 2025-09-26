import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { useCategories } from "@/hooks/useCategories"
export const CategoriesContainer = ({ isCategoriesOpen, setIsCategoriesOpen, categoriesRef }) => {
    const { categories, loading, error, fetchAllCategories } = useCategories();

    useEffect(() => {
        fetchAllCategories();
    }, [fetchAllCategories]);

    const menuId = "categories-menu";

    return (
        <li ref={categoriesRef} className="relative">
            <button
                className="flex items-center cursor-pointer"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                aria-expanded={isCategoriesOpen}
                aria-controls={menuId}
            >
                <span>Categories</span>
                <span className={`transition-all duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                </span>
            </button>

            {error && <p className="text-red-500 mt-1">{error}</p>}

            <ul
                id={menuId}
                role="menu"
                className={`${isCategoriesOpen ? 'flex' : 'hidden'} flex-col gap-4 md:absolute p-2 md:flex-row md:bg-gray-100 md:top-10 md:shadow-md md:rounded-b-md md:gap-8 bg-white`}
            >
                {loading ? (
                    <li role="none" className="px-2 py-1">Loading...</li>
                ) : (
                    categories.map((category) => (
                        <li key={category.id} role="none" className="border-b-1 border-gray-800 md:border-none">
                            <NavLink
                                role="menuitem"
                                to={`/category/${category.slug}`}
                                className="block px-2 py-1"
                            >
                                {category.name}
                            </NavLink>
                        </li>
                    ))
                )}
            </ul>
        </li>
    );
};