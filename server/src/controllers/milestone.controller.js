import milestoneService from "../services/milestone.service.js";

const getMilestones = async (req, res, next) => {
  try {
    const milestones = await milestoneService.getMilestones();

    res.status(200).json({
      success: true,
      data: milestones,
    });
  } catch (error) {
    next(error);
  }
};

const getMilestoneById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const milestone = await milestoneService.getMilestoneById(id);

    res.status(200).json({
      success: true,
      data: milestone,
    });
  } catch (error) {
    next(error);
  }
};

const createMilestone = async (req, res, next) => {
  try {
    const milestone = await milestoneService.createMilestone(req.body);

    res.status(201).json({
      success: true,
      message: "Milestone created successfully",
      data: milestone,
    });
  } catch (error) {
    next(error);
  }
};

const updateMilestone = async (req, res, next) => {
  try {
    const { id } = req.params;

    const milestone = await milestoneService.updateMilestone(id, req.body);

    res.status(200).json({
      success: true,
      message: "Milestone updated successfully",
      data: milestone,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMilestone = async (req, res, next) => {
  try {
    const { id } = req.params;

    await milestoneService.deleteMilestone(id);

    res.status(200).json({
      success: true,
      message: "Milestone deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
};
