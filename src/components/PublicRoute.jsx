import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export const PublicRoute = ({ children }) => {
    const auth = useAuth();

    if (auth.user) {
        return <Navigate to="/" />;
    }

    return children;
};