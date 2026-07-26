import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const createUploadMiddleware = ({ folder, fileType = "image" }) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req) => ({
      folder: typeof folder === "function" ? folder(req) : folder,
      resource_type: "auto",
    }),
  });

  const fileFilter = (req, file, cb) => {
    if (fileType === "pdf") {
      if (file.mimetype !== "application/pdf") {
        return cb(new ApiError(400, "Only PDF files are allowed."));
      }

      return cb(null, true);
    }

    if (fileType === "image") {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new ApiError(400, "Only image files are allowed."));
      }

      return cb(null, true);
    }

    cb(new ApiError(500, "Invalid upload middleware configuration."));
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  });
};

export const uploadProfileImage = createUploadMiddleware({
  folder: "portfolio-cms/profile",
  fileType: "image",
});

export const uploadResume = createUploadMiddleware({
  folder: "portfolio-cms/resume",
  fileType: "pdf",
});

export const uploadMilestoneImage = createUploadMiddleware({
  folder: "portfolio-cms/milestones",
  fileType: "image",
});

export const uploadProjectImage = createUploadMiddleware({
  folder: "portfolio-cms/projects",
  fileType: "image",
});

export default createUploadMiddleware;
