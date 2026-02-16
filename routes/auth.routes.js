import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  getAdminData,
} from "../controllers/auth.controller.js";
import { adminAuth } from "../middlewares/admin.middleware.js";

const router = Router();

/* <----- Admin Auth -----> */

router.route("/me").post(adminAuth, getAdminData);
router.route("/login").post(adminLogin);
router.route("/logout").post(adminAuth, adminLogout);

export const AuthRouter = router;
