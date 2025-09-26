import { NavLink } from "react-router-dom"
export const NavOptions = ({ authUser, roles }) => {
    const navItems = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/most-popular", label: "Most Popular" },
        { to: "/favorites", label: "Favorites" },
    ];

    // Opciones condicionales según authUser y roles
    if (authUser) {
        navItems.push({ to: `/profile/${authUser.email}`, label: "Profile" });
    }

    if (roles.includes("author")) {
        navItems.push({ to: "/create-article", label: "Create Article", ariaLabel: "Add article" });
    }

    return (
        <>
            {navItems.map(({ to, label, ariaLabel }) => (
                <li key={to} className="hover:text-primary">
                    <NavLink
                        to={to}
                        aria-label={ariaLabel}
                        className={({ isActive }) => isActive ? "border-b-2 border-primary" : ""}
                    >
                        {label}
                    </NavLink>
                </li>
            ))}
        </>
    );
};