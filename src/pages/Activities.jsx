import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
    getActivities,
    addActivity,
    deleteActivity,
    updateActivity,
} from "../services/activityService";

function Activities() {
    const [activities, setActivities] = useState([]);

    const [type, setType] = useState("");
    const [duration, setDuration] = useState("");
    const [caloriesBurned, setCaloriesBurned] = useState("");

    const [additionalMetrics, setAdditionalMetrics] = useState({});
    const [metricKey, setMetricKey] = useState("");
    const [metricValue, setMetricValue] = useState("");

    const [editingId, setEditingId] = useState(null);

    /* ================= FETCH ACTIVITIES ================= */

    const loadActivities = async () => {
        try {
            const data = await getActivities();
            setActivities(data);
        } catch (error) {
            console.error("Failed to fetch activities:", error);
        }
    };

    useEffect(() => {
        const init = async () => {
            await loadActivities();
        };
        init();
    }, []);

    /* ================= ADD METRIC ================= */

    const addMetric = () => {
        if (!metricKey || !metricValue) return;

        let value;

        if (metricValue.includes(",")) {
            value = metricValue.split(",").map((item) => item.trim());
        } else if (!isNaN(metricValue)) {
            value = Number(metricValue);
        } else {
            value = metricValue;
        }

        setAdditionalMetrics((prev) => ({
            ...prev,
            [metricKey]: value,
        }));

        setMetricKey("");
        setMetricValue("");
    };

    /* ================= HANDLE EDIT ================= */

    const handleEdit = (activity) => {
        setEditingId(activity.id);
        setType(activity.type);
        setDuration(activity.duration);
        setCaloriesBurned(activity.caloriesBurned);
        setAdditionalMetrics(activity.additionalMetrics || {});
    };

    /* ================= HANDLE DELETE ================= */

    const handleDelete = async (id) => {
        try {
            await deleteActivity(id);
            await loadActivities();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    /* ================= HANDLE SUBMIT ================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date();
        const formattedTime = now.toISOString().slice(0, 19);

        const payload = {
            type,
            duration: Number(duration),
            caloriesBurned: Number(caloriesBurned),
            startTime: formattedTime,
            additionalMetrics,
        };

        try {
            if (editingId) {
                await updateActivity(editingId, payload);
                setEditingId(null);
            } else {
                await addActivity(payload);
            }

            resetForm();
            await loadActivities();
        } catch (error) {
            console.error("Submit failed:", error);
        }
    };

    const resetForm = () => {
        setType("");
        setDuration("");
        setCaloriesBurned("");
        setAdditionalMetrics({});
        setMetricKey("");
        setMetricValue("");
    };

    /* ================= UI ================= */

    return (
        <Layout>
            <div className="grid grid-cols-2 gap-8">

                {/* ===== FORM ===== */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h2 className="text-lg font-semibold mb-4 text-emerald-400">
                        {editingId ? "Edit Activity" : "Add Activity"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-3 bg-gray-900 rounded border border-gray-700"
                            required
                        >
                            <option value="">Select Activity</option>
                            <option value="RUNNING">Running</option>
                            <option value="WALKING">Walking</option>
                            <option value="CYCLING">Cycling</option>
                            <option value="WEIGHT_TRAINING">Weight Training</option>
                            <option value="SWIMMING">Swimming</option>
                            <option value="YOGA">Yoga</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Duration (minutes)"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full p-3 bg-gray-900 rounded border border-gray-700"
                            required
                        />

                        <input
                            type="number"
                            placeholder="Calories Burned"
                            value={caloriesBurned}
                            onChange={(e) => setCaloriesBurned(e.target.value)}
                            className="w-full p-3 bg-gray-900 rounded border border-gray-700"
                            required
                        />

                        {/* ===== ADDITIONAL METRICS ===== */}
                        <div className="border-t border-gray-700 pt-4">
                            <h3 className="text-sm text-gray-400 mb-2">
                                Additional Metrics
                            </h3>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Metric Name"
                                    value={metricKey}
                                    onChange={(e) => setMetricKey(e.target.value)}
                                    className="w-1/2 p-2 bg-gray-900 rounded border border-gray-700"
                                />

                                <input
                                    type="text"
                                    placeholder="Value (comma for array)"
                                    value={metricValue}
                                    onChange={(e) => setMetricValue(e.target.value)}
                                    className="w-1/2 p-2 bg-gray-900 rounded border border-gray-700"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={addMetric}
                                className="mt-2 text-sm text-emerald-400 hover:underline"
                            >
                                + Add Metric
                            </button>

                            <div className="mt-2 text-xs text-gray-400">
                                {Object.entries(additionalMetrics).map(([key, value]) => (
                                    <div key={key}>
                                        {key}: {Array.isArray(value)
                                            ? value.join(", ")
                                            : value}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 transition py-2 rounded"
                        >
                            {editingId ? "Update Activity" : "Add Activity"}
                        </button>

                    </form>
                </div>

                {/* ===== LIST ===== */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h2 className="text-lg font-semibold mb-4 text-emerald-400">
                        Your Activities
                    </h2>

                    <div className="space-y-4">
                        {activities.length === 0 ? (
                            <p className="text-gray-400">No activities yet</p>
                        ) : (
                            activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="bg-gray-900 p-4 rounded border border-gray-700"
                                >
                                    <p className="font-semibold">{activity.type}</p>
                                    <p className="text-sm text-gray-400">
                                        {activity.duration} minutes
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {activity.caloriesBurned} kcal
                                    </p>

                                    {activity.additionalMetrics &&
                                        Object.entries(activity.additionalMetrics).map(([k, v]) => (
                                            <div key={k} className="text-xs text-gray-500 mt-1">
                                                <span className="font-semibold">{k}: </span>
                                                {Array.isArray(v) ? (
                                                    <ul className="list-disc list-inside">
                                                        {v.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    v
                                                )}
                                            </div>
                                        ))
                                    }

                                    <div className="flex gap-4 mt-3">
                                        <button
                                            onClick={() => handleDelete(activity.id)}
                                            className="text-red-400 text-sm hover:underline"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => handleEdit(activity)}
                                            className="text-yellow-400 text-sm hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </Layout>
    );
}

export default Activities;
