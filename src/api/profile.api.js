import api from "./axios.config";

export const profileApi = {
  getProfile: () => api.get("/profile"),
  updateProfile: (data) => api.put("/profile", data),
  deleteProfile: () => api.delete("/profile"),
};
