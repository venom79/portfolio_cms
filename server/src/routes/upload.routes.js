import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import { uploadFile, deleteFile } from "../controllers/upload.controller.js";

const router = Router();

router.post("/profile", authenticate, upload.single("file"), uploadFile);

router.post("/resume", authenticate, upload.single("file"), uploadFile);

router.post("/milestones", authenticate, upload.single("file"), uploadFile);

router.post("/projects/:slug", authenticate, upload.single("file"), uploadFile);

router.delete("/", authenticate, deleteFile);

export default router;
