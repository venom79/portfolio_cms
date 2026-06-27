import * as authService from "../services/auth.service.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export { login };
