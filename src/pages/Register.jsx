import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosInstance.post("/api/auth/register", formData);

            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-950 text-gray-100">
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-emerald-400 text-center">
                    Register
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-emerald-400"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-emerald-400"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-emerald-400"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password (min 6 chars)"
                        className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-emerald-400"
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 transition py-2 rounded font-semibold"
                    >
                        Register
                    </button>

                </form>

                <p className="text-sm text-center mt-6 text-gray-400">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-emerald-400 cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}

export default Register;
