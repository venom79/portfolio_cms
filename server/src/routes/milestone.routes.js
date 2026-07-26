import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";

import {
  getMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
  updateMilestoneImage,
  deleteMilestoneImage,
} from "../controllers/milestone.controller.js";
import { uploadMilestoneImage } from "../middleware/upload.middleware.js";

const router = Router();

// Public Routes
router.get("/", getMilestones);
router.get("/:id", getMilestoneById);

// Protected Routes
router.post("/", authenticate, createMilestone);
router.patch("/:id", authenticate, updateMilestone);
router.delete("/:id", authenticate, deleteMilestone);

router.patch(
  "/:id/image",
  authenticate,
  uploadMilestoneImage.single("file"),
  updateMilestoneImage,
);

router.delete("/:id/image", authenticate, deleteMilestoneImage);
export default router;
