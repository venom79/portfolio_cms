import Milestone from "../models/milestone.model.js";
import ApiError from "../utils/ApiError.js";

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

  milestone.isDeleted = true;

  await milestone.save();

  return milestone;
};

const milestoneService = {
  getMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
};

export default milestoneService;
