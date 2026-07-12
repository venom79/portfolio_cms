import api from "./api";

export const createProject = async (project) => {
  const response = await api.post("/projects", project);

  return response.data.data;
};

export const updateProject = async (id, project) => {
  const response = await api.patch(`/projects/${id}`, project);

  return response.data.data;
};

export const getProjects = async () => {
  const response = await api.get("/projects");

  return response.data.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);

  return response.data.data;
};

/**
 * Upload Thumbnail
 */
export const uploadThumbnail = async (slug, file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(`/upload/projects/${slug}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

/**
 * Upload Gallery Images
 */
export const uploadGallery = async (slug, files) => {
  const uploads = [];

  for (const file of files) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(`/upload/projects/${slug}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    uploads.push(response.data.data);
  }

  return uploads;
};
