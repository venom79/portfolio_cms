import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import {
  uploadProfileImage,
  uploadResume,
} from "../middleware/upload.middleware.js";

import {
  deleteProfileImage,
  deleteResume,
  getProfile,
  updateProfile,
  updateProfileImage,
  updateResume,
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/", getProfile);

router.patch("/", authenticate, updateProfile);

// profile image
router.patch(
  "/image",
  authenticate,
  uploadProfileImage.single("file"),
  updateProfileImage,
);

router.delete("/image", authenticate, deleteProfileImage);

// resume
router.patch(
  "/resume",
  authenticate,
  uploadResume.single("file"),
  updateResume,
);

router.delete("/resume", authenticate, deleteResume);

export default router;
