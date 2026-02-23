import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axiosInstance from "../utils/axiosInstance";

function Recommendations() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* ================= FETCH RECOMMENDATION ================= */

    useEffect(() => {
        const fetchRecommendation = async () => {
            try {
                const response = await axiosInstance.get("/api/recommendations");
                setData(response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load recommendations");
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendation();
    }, []);

    /* ================= LEVEL COLOR ================= */

    const getLevelColor = (level) => {
        switch (level) {
            case "Beginner":
                return "bg-blue-500";
            case "Intermediate":
                return "bg-yellow-500";
            case "Advanced":
                return "bg-red-500";
            case "Growing":
                return "bg-emerald-500";
            default:
                return "bg-gray-500";
        }
    };

    /* ================= UI ================= */

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold text-emerald-400 mb-8">
                    Your Fitness Insights
                </h1>

                {loading && (
                    <div className="text-gray-400">
                        Loading recommendations...
                    </div>
                )}

                {error && (
                    <div className="text-red-400">
                        {error}
                    </div>
                )}

                {data && (
                    <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">

                        {/* Title */}
                        <h2 className="text-2xl font-semibold mb-4 text-white">
                            {data.title}
                        </h2>

                        {/* Message */}
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            {data.message}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-gray-400 text-sm">
                                    Total Calories Burned
                                </p>
                                <p className="text-xl font-bold text-emerald-400">
                                    {data.totalCalories} kcal
                                </p>
                            </div>

                            <span
                                className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getLevelColor(
                                    data.level
                                )}`}
                            >
                                {data.level}
                            </span>

                        </div>

                    </div>
                )}

            </div>
        </Layout>
    );
}

export default Recommendations;
