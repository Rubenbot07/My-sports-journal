import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";

export const PrivateRoute = ({ children, roles }) => {
    const location = useLocation()
    const user = useUserStore((state) => state.user);
    const userRoles = useUserStore((state) => state.roles);

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    if (roles && !roles.includes(userRoles)) {
        return <Navigate to='/' />
    }

    return children
}
