import { Router } from "express";
import {
  manageBanners,
  pullBannerBySpecials,
  pullBanners,
} from "../controllers/banners.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/banners");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.route("/banners").get(pullBanners);
router.route("/banners/save").post(upload.array("newImages"), manageBanners);

router.route("/featured/banners").get(pullBannerBySpecials);

export const BannerRouter = router;
