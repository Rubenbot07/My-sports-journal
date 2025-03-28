import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export const PublicRoute = ({ children }) => {
    const location = useLocation();
    const auth = useAuth();

    if (auth.user) {
        const redirectTo = location.state?.from?.pathname || '/';
        return <Navigate to={redirectTo} />;
    }

    return children;
};