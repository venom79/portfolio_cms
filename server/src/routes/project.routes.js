import { Router } from "express";
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  updateProjectThumbnail,
  deleteProjectThumbnail,
  addGalleryImage,
  deleteGalleryImage,
} from "../controllers/project.controller.js";
import authenticate from "../middleware/auth.middleware.js";

import { uploadProjectImage } from "../middleware/upload.middleware.js";

const router = Router();

// Public Routes
router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);

// Protected Routes
router.post("/", authenticate, createProject);
router.patch("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);

router.patch(
  "/:id/thumbnail",
  authenticate,
  uploadProjectImage.single("file"),
  updateProjectThumbnail,
);

router.delete("/:id/thumbnail", authenticate, deleteProjectThumbnail);

router.post(
  "/:id/gallery",
  authenticate,
  uploadProjectImage.single("file"),
  addGalleryImage,
);

router.delete("/:id/gallery/:imageId", authenticate, deleteGalleryImage);

export default router;
