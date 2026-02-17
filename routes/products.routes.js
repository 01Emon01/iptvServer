import { Router } from "express";
import {
  changeSpecials,
  editProduct,
  makeCategory,
  makeProduct,
  pullBoxesProduct,
  pullCategories,
  pullProductById,
  pullProducts,
  pullSpecials,
  pullSubsProduct,
} from "../controllers/products.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.route("/categories").get(pullCategories);
router.route("/categories/create").post(makeCategory);

router.route("/products").get(pullProducts);
router.route("/products/:id").get(pullProductById);
router.route("/products/create").post(upload.array("images", 5), makeProduct);
router.route("/products/edit/:id").post(upload.array("images", 5), editProduct);

/* <----- Category Based -----> */

router.route("/products/category/boxes").get(pullBoxesProduct);
router.route("/products/category/subs").get(pullSubsProduct);

/* <----- Specials -----> */

router.route("/products/specials").post(changeSpecials);
router.route("/products/specials/view").get(pullSpecials);

export const ProductRouter = router;
