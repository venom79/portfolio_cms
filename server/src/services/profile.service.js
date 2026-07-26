import Profile from "../models/profile.model.js";
import ApiError from "../utils/ApiError.js";
import cloudinaryService from "./cloudinary.service.js";

const getProfile = async () => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  return profile;
};

const updateProfile = async (profileData) => {
  const profile = await Profile.findOneAndUpdate({}, profileData, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  return profile;
};

const updateProfileImage = async (file) => {
  if (!file) {
    throw new ApiError(400, "No image uploaded");
  }

  const profile = await Profile.findOne();

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  if (profile.profileImage?.publicId) {
    await cloudinaryService.deleteFromCloudinary(profile.profileImage.publicId);
  }

  const uploadedFile = cloudinaryService.getUploadedFileData(file);

  profile.profileImage = {
    url: uploadedFile.url,
    publicId: uploadedFile.publicId,
  };

  await profile.save();

  return profile;
};

const deleteProfileImage = async () => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  if (!profile.profileImage?.publicId) {
    throw new ApiError(404, "Profile image not found");
  }

  await cloudinaryService.deleteFromCloudinary(profile.profileImage.publicId);

  profile.profileImage = {
    url: "",
    publicId: "",
  };

  await profile.save();

  return profile;
};

const updateResume = async (file) => {
  if (!file) {
    throw new ApiError(400, "No resume uploaded");
  }

  const profile = await Profile.findOne();

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  if (profile.resume?.publicId) {
    await cloudinaryService.deleteFromCloudinary(profile.resume.publicId);
  }

  const uploadedFile = cloudinaryService.getUploadedFileData(file);

  profile.resume = {
    url: uploadedFile.url,
    publicId: uploadedFile.publicId,
  };

  await profile.save();

  return profile;
};

const deleteResume = async () => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  if (!profile.resume?.publicId) {
    throw new ApiError(404, "Resume not found");
  }

  await cloudinaryService.deleteFromCloudinary(profile.resume.publicId);

  profile.resume = null;

  await profile.save();

  return profile;
};

const profileService = {
  getProfile,
  updateProfile,
  updateProfileImage,
  deleteProfileImage,
  updateResume,
  deleteResume,
};

export default profileService;
