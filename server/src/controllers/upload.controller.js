import uploadService from "../services/upload.service.js";

const uploadFile = async (req, res, next) => {
  try {
    const file = await uploadService.uploadFile(req.file);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: file,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { publicId } = req.body;

    await uploadService.deleteFile(publicId);

    res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { uploadFile, deleteFile };
