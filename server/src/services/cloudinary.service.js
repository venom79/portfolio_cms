import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";

const getUploadedFileData = (file) => {
  if (!file) {
    throw new ApiError(400, "No file uploaded");
  }

  return {
    url: file.path,
    publicId: file.filename,
  };
};

const deleteFromCloudinary = async (publicId) => {
  if (!publicId) {
    throw new ApiError(400, "Public ID is required");
  }

  const result = await cloudinary.uploader.destroy(publicId);

  if (result.result !== "ok") {
    throw new ApiError(404, "File not found");
  }
};

export default {
  getUploadedFileData,
  deleteFromCloudinary,
};
