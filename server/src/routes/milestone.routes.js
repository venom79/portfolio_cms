import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";

import {
  getMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
} from "../controllers/milestone.controller.js";

const router = Router();

// Public Routes
router.get("/", getMilestones);
router.get("/:id", getMilestoneById);

// Protected Routes
router.post("/", authenticate, createMilestone);
router.patch("/:id", authenticate, updateMilestone);
router.delete("/:id", authenticate, deleteMilestone);

export default router;
