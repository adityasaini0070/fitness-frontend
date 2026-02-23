import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axiosInstance from "../utils/axiosInstance";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    /* ================= LOAD DATA ================= */

    useEffect(() => {
        const loadData = async () => {
            try {
                const usersRes = await axiosInstance.get("/api/admin/users");
                const activitiesRes = await axiosInstance.get("/api/admin/activities");
                const recRes = await axiosInstance.get("/api/admin/recommendations");

                setUsers(usersRes.data);
                setActivities(activitiesRes.data);
                setRecommendations(recRes.data);
            } catch (err) {
                console.error("Admin load error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    /* ================= DELETE FUNCTIONS ================= */

    const deleteUser = async (id) => {
        try {
            await axiosInstance.delete(`/api/admin/users/${id}`);
            setUsers(prev => prev.filter(user => user.id !== id));
        } catch (err) {
            console.error("Delete user failed:", err);
        }
    };

    const deleteActivity = async (id) => {
        try {
            await axiosInstance.delete(`/api/admin/activities/${id}`);
            setActivities(prev => prev.filter(activity => activity.id !== id));
        } catch (err) {
            console.error("Delete activity failed:", err);
        }
    };

    const deleteRecommendation = async (id) => {
        try {
            await axiosInstance.delete(`/api/admin/recommendations/${id}`);
            setRecommendations(prev => prev.filter(rec => rec.id !== id));
        } catch (err) {
            console.error("Delete recommendation failed:", err);
        }
    };

    /* ================= UI ================= */

    return (
        <Layout>
            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold text-red-400 mb-8">
                    Admin Dashboard
                </h1>

                {loading ? (
                    <p className="text-gray-400">Loading admin data...</p>
                ) : (
                    <div className="space-y-10">

                        {/* USERS */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-white">
                                Users
                            </h2>

                            <div className="bg-gray-800 rounded-lg overflow-hidden">
                                {users.map(user => (
                                    <div
                                        key={user.id}
                                        className="flex justify-between items-center border-b border-gray-700 px-4 py-3"
                                    >
                                        <div>
                                            <p className="text-white">{user.email}</p>
                                            <p className="text-gray-400 text-sm">
                                                Role: {user.role}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ACTIVITIES */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-white">
                                Activities
                            </h2>

                            <div className="bg-gray-800 rounded-lg overflow-hidden">
                                {activities.map(activity => (
                                    <div
                                        key={activity.id}
                                        className="flex justify-between items-center border-b border-gray-700 px-4 py-3"
                                    >
                                        <div>
                                            <p className="text-white">
                                                {activity.type}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                {activity.caloriesBurned} kcal
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => deleteActivity(activity.id)}
                                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* RECOMMENDATIONS */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-white">
                                Recommendations
                            </h2>

                            <div className="bg-gray-800 rounded-lg overflow-hidden">
                                {recommendations.map(rec => (
                                    <div
                                        key={rec.id}
                                        className="flex justify-between items-center border-b border-gray-700 px-4 py-3"
                                    >
                                        <div>
                                            <p className="text-white">
                                                {rec.type}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                {rec.recommendation}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => deleteRecommendation(rec.id)}
                                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                )}

            </div>
        </Layout>
    );
}

export default AdminDashboard;