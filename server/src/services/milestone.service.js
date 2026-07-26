import Milestone from "../models/milestone.model.js";
import ApiError from "../utils/ApiError.js";
import cloudinaryService from "./cloudinary.service.js";

const getMilestones = async () => {
  return await Milestone.find({
    isPublished: true,
    isDeleted: false,
  }).sort({
    order: 1,
  });
};

const getMilestoneById = async (id) => {
  const milestone = await Milestone.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!milestone) {
    throw new ApiError(404, "Milestone not found");
  }

  return milestone;
};

const createMilestone = async (milestoneData) => {
  return await Milestone.create(milestoneData);
};

const updateMilestone = async (id, milestoneData) => {
  const milestone = await Milestone.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    milestoneData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!milestone) {
    throw new ApiError(404, "Milestone not found");
  }

  return milestone;
};

const deleteMilestone = async (id) => {
  const milestone = await Milestone.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!milestone) {
    throw new ApiError(404, "Milestone not found");
  }

  if (milestone.image?.publicId) {
    await cloudinaryService.deleteFromCloudinary(milestone.image.publicId);
  }

  milestone.image = null;
  milestone.isDeleted = true;

  await milestone.save();

  return milestone;
};

const updateMilestoneImage = async (id, file) => {
  if (!file) {
    throw new ApiError(400, "No image uploaded");
  }

  const milestone = await Milestone.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!milestone) {
    throw new ApiError(404, "Milestone not found");
  }

  if (milestone.image?.publicId) {
    await cloudinaryService.deleteFromCloudinary(milestone.image.publicId);
  }

  const uploadedFile = cloudinaryService.getUploadedFileData(file);

  milestone.image = {
    url: uploadedFile.url,
    publicId: uploadedFile.publicId,
  };

  await milestone.save();

  return milestone;
};

const deleteMilestoneImage = async (id) => {
  const milestone = await Milestone.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!milestone) {
    throw new ApiError(404, "Milestone not found");
  }

  if (!milestone.image?.publicId) {
    throw new ApiError(404, "Milestone image not found");
  }

  await cloudinaryService.deleteFromCloudinary(milestone.image.publicId);

  milestone.image = null;

  await milestone.save();

  return milestone;
};

const milestoneService = {
  getMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
  updateMilestoneImage,
  deleteMilestoneImage,
};

export default milestoneService;
