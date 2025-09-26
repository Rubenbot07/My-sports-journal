import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";

export const PrivateRoute = ({ children, roles }) => {
    const location = useLocation()
    const user = useUserStore((state) => state.user);
    const userRoles = useUserStore((state) => state.roles).map(r => r.name);
    const hasRole = userRoles.some(role => roles?.includes(role));
    

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    if (roles && !hasRole) {
        return <Navigate to='/' />
    }

    return children
}
