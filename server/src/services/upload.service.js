import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";

const uploadFile = async (file) => {
  if (!file) {
    throw new ApiError(400, "No file uploaded");
  }

  return {
    url: file.path,
    publicId: file.filename,
    originalName: file.originalname,
    type: file.mimetype,
    size: file.size,
  };
};

const deleteFile = async (publicId) => {
  if (!publicId) {
    throw new ApiError(400, "Public ID is required");
  }

  const result = await cloudinary.uploader.destroy(publicId);

  if (result.result !== "ok") {
    throw new ApiError(404, "File not found");
  }

  return result;
};

const uploadService = {
  uploadFile,
  deleteFile,
};

export default uploadService;
