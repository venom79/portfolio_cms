import Profile from "../models/profile.model.js";
import ApiError from "../utils/ApiError.js";

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

const profileService = {
  getProfile,
  updateProfile,
};

export default profileService;
