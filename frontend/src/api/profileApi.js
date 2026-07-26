import { api } from "../lib/axios";

export const profileApi = {
  get: () => api.get("/profile").then((r) => r.data),
  update: (payload) => api.patch("/profile", payload).then((r) => r.data),

  uploadImage: (file) => {
    const form = new FormData();
    form.append("file", file);
    return api
      .patch("/profile/image", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
  deleteImage: () => api.delete("/profile/image").then((r) => r.data),

  uploadResume: (file) => {
    const form = new FormData();
    form.append("file", file);
    return api
      .patch("/profile/resume", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
  deleteResume: () => api.delete("/profile/resume").then((r) => r.data),
};
