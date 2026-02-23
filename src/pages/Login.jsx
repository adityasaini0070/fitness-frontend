import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/api/auth/login", {
                email,
                password,
            });

            login(response.data.token, response.data.user.role);

            if (response.data.user.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            console.error(error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-950 text-gray-100">
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-emerald-400 text-center">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 bg-gray-800 rounded border border-gray-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 bg-gray-800 rounded border border-gray-700"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 transition py-2 rounded"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center mt-6 text-gray-400">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-emerald-400 cursor-pointer hover:underline"
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
