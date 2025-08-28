import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useUserStore } from "@/stores/userStore";

export const PrivateRoute = ({ children, roles }) => {
    const location = useLocation()
    const auth = useAuth()
    const user = useUserStore((state) => state.user);

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    if (roles && !roles.includes(auth.role)) {
        return <Navigate to='/' />
    }

    return children
}
