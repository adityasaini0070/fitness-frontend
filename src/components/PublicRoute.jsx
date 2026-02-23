import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function PublicRoute({ children }) {
    const { token, role } = useContext(AuthContext);

    if (token) {
        // Redirect based on role
        return role === "ADMIN"
            ? <Navigate to="/admin" replace />
            : <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;