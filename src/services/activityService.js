import axiosInstance from "../utils/axiosInstance";

export const getActivities = async () => {
    const response = await axiosInstance.get("/api/activities");
    return response.data;
};

export const addActivity = async (activityData) => {
    const response = await axiosInstance.post(
        "/api/activities",
        activityData
    );
    return response.data;
};
export const deleteActivity = async (id) => {
    await axiosInstance.delete(`/api/activities/${id}`);
};

export const updateActivity = async (id, data) => {
    const response = await axiosInstance.put(
        `/api/activities/${id}`,
        data
    );
    return response.data;
};
