import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Layout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const linkStyle = (path) =>
        `block py-2 px-4 rounded transition ${location.pathname === path
            ? "bg-emerald-500 text-white"
            : "text-gray-400 hover:text-white"
        }`;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-gray-950 text-white">

            {/* Sidebar */}
            <div className="w-64 bg-gray-900 p-6 border-r border-gray-800 flex flex-col justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-emerald-400 mb-8">
                        Fitness
                    </h1>

                    <nav className="space-y-4">
                        <Link to="/" className={linkStyle("/")}>
                            Dashboard
                        </Link>

                        <Link to="/activities" className={linkStyle("/activities")}>
                            Activities
                        </Link>

                        <Link to="/recommendations" className={linkStyle("/recommendations")}>
                            Recommendations
                        </Link>
                    </nav>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="mt-8 bg-red-500 hover:bg-red-600 transition py-2 rounded"
                >
                    Logout
                </button>

            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {children}
            </div>

        </div>
    );
}

export default Layout;
