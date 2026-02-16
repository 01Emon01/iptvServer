import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  const { admToken } = req.cookies;
  if (!admToken) {
    return res.status(500).json({
      success: false,
      message: "Not authorized.",
    });
  }
  try {
    const decodedToken = jwt.verify(admToken, process.env.JWT_SECRET);
    if (decodedToken.id) {
      req.body.adminId = decodedToken.id;
    } else {
      return res.status(500).json({
        success: false,
        message: "Not authorized.",
      });
    }
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
