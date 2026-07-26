import projectService from "../services/project.service.js";

const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects();

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const project = await projectService.getProjectBySlug(slug);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await projectService.updateProject(id, req.body);

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    await projectService.deleteProject(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateProjectThumbnail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await projectService.updateProjectThumbnail(id, req.file);

    res.status(200).json({
      success: true,
      message: "Project thumbnail updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProjectThumbnail = async (req, res, next) => {
  try {
    const { id } = req.params;

    await projectService.deleteProjectThumbnail(id);

    res.status(200).json({
      success: true,
      message: "Project thumbnail deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const addGalleryImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await projectService.addGalleryImage(id, req.file);

    res.status(200).json({
      success: true,
      message: "Gallery image added successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const deleteGalleryImage = async (req, res, next) => {
  try {
    const { id, imageId } = req.params;

    const project = await projectService.deleteGalleryImage(id, imageId);

    res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  updateProjectThumbnail,
  deleteProjectThumbnail,
  addGalleryImage,
  deleteGalleryImage,
};
