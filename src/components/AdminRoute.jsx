import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { token, role } = useContext(AuthContext);

    if (!token) return <Navigate to="/login" />;
    if (role !== "ADMIN") return <Navigate to="/dashboard" />;

    return children;
};

export default AdminRoute;