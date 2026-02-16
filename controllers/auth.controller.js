import {
  comparePass,
  getAdmin,
  getAdminById,
} from "../services/auth.services.js";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await getAdmin(username);
    if (!admin) {
      return res.status(500).json({
        success: false,
        message: "Admin doesn't exists.",
      });
    }
    const passValid = await comparePass(password, admin.password);
    if (!passValid) {
      return res.status(500).json({
        success: false,
        message: "Wrong credentials!",
      });
    }
    const admToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("admToken", admToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Admin logged in.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("admToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.json({
      success: true,
      message: "Admin logged out.",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

export const getAdminData = async (req, res) => {
  try {
    const { adminId } = req.body;
    const admin = await getAdminById(adminId);
    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found.",
      });
    }
    return res.json({
      success: true,
      adminData: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
