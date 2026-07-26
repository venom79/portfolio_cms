import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import generateSlug from "../utils/generateSlug.js";
import cloudinaryService from "./cloudinary.service.js";

const getProjects = async () => {
  const projects = await Project.find({
    isPublished: true,
    isDeleted: false,
  }).sort({
    order: 1,
  });

  return projects;
};

const getProjectBySlug = async (slug) => {
  const project = await Project.findOne({
    slug,
    isPublished: true,
    isDeleted: false,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

const createProject = async (projectData) => {
  const slug = generateSlug(projectData.title);

  const existingProject = await Project.findOne({ slug, isDeleted: false });

  if (existingProject) {
    throw new ApiError(409, "Project already exists");
  }

  const project = await Project.create({
    ...projectData,
    slug,
  });

  return project;
};

const updateProject = async (id, projectData) => {
  if (projectData.title) {
    projectData.slug = generateSlug(projectData.title);
  }

  const project = await Project.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    projectData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

const deleteProject = async (id) => {
  const project = await Project.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const deletePromises = [];

  if (project.thumbnail?.publicId) {
    deletePromises.push(
      cloudinaryService.deleteFromCloudinary(project.thumbnail.publicId),
    );
  }

  for (const image of project.gallery) {
    if (image.publicId) {
      deletePromises.push(
        cloudinaryService.deleteFromCloudinary(image.publicId),
      );
    }
  }

  await Promise.all(deletePromises);

  // Clear file references
  project.thumbnail = null;
  project.gallery = [];

  // Soft delete
  project.isDeleted = true;

  await project.save();

  return project;
};

const updateProjectThumbnail = async (id, file) => {
  if (!file) {
    throw new ApiError(400, "No thumbnail uploaded");
  }

  const project = await Project.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.thumbnail?.publicId) {
    await cloudinaryService.deleteFromCloudinary(project.thumbnail.publicId);
  }

  const uploadedFile = cloudinaryService.getUploadedFileData(file);

  project.thumbnail = {
    url: uploadedFile.url,
    publicId: uploadedFile.publicId,
  };

  await project.save();

  return project;
};

const deleteProjectThumbnail = async (id) => {
  const project = await Project.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (!project.thumbnail?.publicId) {
    throw new ApiError(404, "Project thumbnail not found");
  }

  await cloudinaryService.deleteFromCloudinary(project.thumbnail.publicId);

  project.thumbnail = null;

  await project.save();

  return project;
};

const addGalleryImage = async (id, file) => {
  if (!file) {
    throw new ApiError(400, "No image uploaded");
  }

  const project = await Project.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.gallery.length >= 10) {
    throw new ApiError(400, "Maximum of 10 gallery images allowed.");
  }

  const uploadedFile = cloudinaryService.getUploadedFileData(file);

  project.gallery.push({
    url: uploadedFile.url,
    publicId: uploadedFile.publicId,
  });

  await project.save();

  return project;
};

const deleteGalleryImage = async (id, imageId) => {
  const project = await Project.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const image = project.gallery.id(imageId);

  if (!image) {
    throw new ApiError(404, "Gallery image not found");
  }

  await cloudinaryService.deleteFromCloudinary(image.publicId);

  image.deleteOne();

  await project.save();

  return project;
};

const projectService = {
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

export default projectService;
