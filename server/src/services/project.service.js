import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import generateSlug from "../utils/generateSlug.js";

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

  project.isDeleted = true;

  await project.save();

  return project;
};

const projectService = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};

export default projectService;
