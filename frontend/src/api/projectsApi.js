import { api } from "../lib/axios";

export const projectsApi = {
  list: () => api.get("/projects").then((r) => r.data),
  getBySlug: (slug) => api.get(`/projects/${slug}`).then((r) => r.data),
  create: (payload) => api.post("/projects", payload).then((r) => r.data),
  update: (id, payload) =>
    api.patch(`/projects/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/projects/${id}`).then((r) => r.data),

  uploadThumbnail: (id, file) => {
    const form = new FormData();
    form.append("file", file);
    return api
      .patch(`/projects/${id}/thumbnail`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
  deleteThumbnail: (id) =>
    api.delete(`/projects/${id}/thumbnail`).then((r) => r.data),

  addGalleryImage: (id, file) => {
    const form = new FormData();
    form.append("file", file);
    return api
      .post(`/projects/${id}/gallery`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
  deleteGalleryImage: (id, imageId) =>
    api.delete(`/projects/${id}/gallery/${imageId}`).then((r) => r.data),
};
