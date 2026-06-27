import { Router } from "express";
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

// Public Routes
router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);

// Protected Routes
router.post("/", authenticate, createProject);
router.patch("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);

export default router;
