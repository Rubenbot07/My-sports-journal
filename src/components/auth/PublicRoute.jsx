import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";

export const PublicRoute = ({ children }) => {
    const location = useLocation();
    const user = useUserStore((state) => state.user);

    if (user) {
        const redirectTo = location.state?.from?.pathname || '/';
        return <Navigate to={redirectTo} />;
    }

    return children;
};