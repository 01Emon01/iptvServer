import { Router } from "express";
import {
  editSettings,
  pullSettings,
} from "../controllers/general.controller.js";

const router = Router();

router.route("/siteInfo").get(pullSettings);
router.route("/settings/update").post(editSettings);

export const GeneralRouter = router;
