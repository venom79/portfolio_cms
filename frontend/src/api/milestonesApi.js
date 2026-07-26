import { api } from "../lib/axios";

export const milestonesApi = {
  list: () => api.get("/milestones").then((r) => r.data),
  getById: (id) => api.get(`/milestones/${id}`).then((r) => r.data),
  create: (payload) => api.post("/milestones", payload).then((r) => r.data),
  update: (id, payload) =>
    api.patch(`/milestones/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/milestones/${id}`).then((r) => r.data),

  uploadImage: (id, file) => {
    const form = new FormData();
    form.append("file", file);
    return api
      .patch(`/milestones/${id}/image`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
  deleteImage: (id) =>
    api.delete(`/milestones/${id}/image`).then((r) => r.data),
};
