import { Router } from "express";
import {
  deleteContact,
  editSettings,
  pullContacts,
  pullSettings,
  uploadContact,
  viewContact,
} from "../controllers/general.controller.js";

const router = Router();

router.route("/siteInfo").get(pullSettings);
router.route("/settings/update").post(editSettings);

router.route("/contacts/pull").get(pullContacts);
router.route("/contacts/upload").post(uploadContact);
router.route("/contacts/view/:id").get(viewContact);
router.route("/contacts/delete/:id").delete(deleteContact);

export const GeneralRouter = router;
