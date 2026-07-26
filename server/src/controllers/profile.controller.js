import profileService from "../services/profile.service.js";

const getProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfile();

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const profile = await profileService.updateProfile(req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfileImage = async (req, res, next) => {
  try {
    const profile = await profileService.updateProfileImage(req.file);

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProfileImage = async (req, res, next) => {
  try {
    await profileService.deleteProfileImage();

    res.status(200).json({
      success: true,
      message: "Profile image deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateResume = async (req, res, next) => {
  try {
    const profile = await profileService.updateResume(req.file);

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

const deleteResume = async (req, res, next) => {
  try {
    await profileService.deleteResume();

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getProfile,
  updateProfile,
  updateProfileImage,
  deleteProfileImage,
  updateResume,
  deleteResume,
};
