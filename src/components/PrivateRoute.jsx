import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export const PrivateRoute = ({ children, roles }) => {
    const location = useLocation()
    const auth = useAuth()

    if (!auth.user) {
        console.log(location.pathname)
        return <Navigate to='/login' state={{ from: location.pathname }} />
    }

    if (roles && !roles.includes(auth.role)) {
        return <Navigate to='/' />
    }

    return children
}