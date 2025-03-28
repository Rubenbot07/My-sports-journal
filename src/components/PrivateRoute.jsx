import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export const PrivateRoute = ({ children, roles }) => {
    const location = useLocation()
    const auth = useAuth()

    if (!auth.user) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    if (roles && !roles.includes(auth.role)) {
        return <Navigate to='/' />
    }

    return children
}
