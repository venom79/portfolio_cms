import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const getFolder = (req) => {
  if (req.path === "/profile") {
    return "portfolio-cms/profile";
  }

  if (req.path === "/resume") {
    return "portfolio-cms/resume";
  }

  if (req.path === "/milestones") {
    return "portfolio-cms/milestones";
  }

  if (req.params.slug) {
    return `portfolio-cms/projects/${req.params.slug}`;
  }

  return "portfolio-cms/misc";
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req) => ({
    folder: getFolder(req),
    resource_type: "auto",
  }),
});

const fileFilter = (req, file, cb) => {
  const isResumeRoute = req.path === "/resume";

  if (isResumeRoute) {
    if (file.mimetype !== "application/pdf") {
      return cb(new ApiError(400, "Only PDF files are allowed."));
    }

    return cb(null, true);
  }

  if (!file.mimetype.startsWith("image/")) {
    return cb(new ApiError(400, "Only image files are allowed."));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

export default upload;
