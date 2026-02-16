import path from "path";
import {
  createCategory,
  createProduct,
  editSpecials,
  fetchCategories,
  fetchProductById,
  fetchProducts,
  fetchSpecials,
  fetchSubsProduct,
  findCateBySlug,
  updateProduct,
} from "../services/products.services.js";
import fs from "fs";

export const makeCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = await findCateBySlug(slug);
    if (category) {
      return res.status(500).json({
        success: false,
        message: "Category already exists",
      });
    }
    await createCategory({ name, slug });
    return res.status(200).json({
      success: true,
      message: "Category created successfully!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const pullCategories = async (req, res) => {
  try {
    const categories = await fetchCategories();
    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

export const makeProduct = async (req, res) => {
  const files = req.files;
  try {
    const data = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const imagePaths = files.map((file) => file.path);

    await createProduct({
      ...data,
      images: imagePaths,
    });

    return res.status(200).json({
      success: true,
      message: "Product created successfully!",
    });
  } catch (err) {
    console.log(err);
    if (files && files.length > 0) {
      await Promise.all(
        files.map((file) => fs.promises.unlink(file.path).catch(() => null)),
      );
    }
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

export const pullProducts = async (req, res) => {
  try {
    const { c, n } = req.query;
    const products = await fetchProducts(c, n);
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

export const pullProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await fetchProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

export const editProduct = async (req, res) => {
  const files = req.files || [];

  try {
    const data = req.body;

    const deletedImages = [].concat(data.deletedImgs || []);
    const existingImages = [].concat(data.existingImgs || []);

    const deleted = Array.isArray(deletedImages)
      ? deletedImages
      : [deletedImages];

    const existing = Array.isArray(existingImages)
      ? existingImages
      : [existingImages];

    const newImagePaths = files.map((file) => file.path);

    const finalImages = [...existing, ...newImagePaths];

    if (finalImages.length === 0) {
      await Promise.all(
        newImagePaths.map((p) => fs.promises.unlink(p).catch(() => null)),
      );

      return res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
    }

    if (finalImages.length > 5) {
      await Promise.all(
        newImagePaths.map((p) => fs.promises.unlink(p).catch(() => null)),
      );

      return res.status(400).json({
        success: false,
        message: "Maximum 5 images allowed",
      });
    }

    const { id } = req.params;

    await updateProduct(id, {
      ...data,
      images: finalImages,
    });

    if (deleted.length > 0) {
      await Promise.all(
        deleted.map((imgPath) => {
          const safePath = path.join(
            "uploads/products",
            path.basename(imgPath),
          );

          return fs.promises.unlink(safePath).catch(() => null);
        }),
      );
    }

    return res.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (err) {
    console.error("Edit product failed:", err);

    if (files.length > 0) {
      await Promise.all(
        files.map((file) => fs.promises.unlink(file.path).catch(() => null)),
      );
    }

    return res.status(500).json({
      success: false,
      message: "Failed to edit product",
    });
  }
};

export const changeSpecials = async (req, res) => {
  try {
    const { fstPrd, secPrd, thirdPrd, frthPrd } = req.body;
    if (!fstPrd || !secPrd || !thirdPrd || !frthPrd) {
      return res.status(500).json({
        success: false,
        message: "All four ID of the products are needed",
      });
    }
    await editSpecials({ fstPrd, secPrd, thirdPrd, frthPrd });
    return res.status(200).json({
      success: true,
      message: "Change saved successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const pullSpecials = async (req, res) => {
  try {
    const products = await fetchSpecials();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "failed to fetch specials",
    });
  }
};

export const pullSubsProduct = async (req, res) => {
  try {
    const products = await fetchSubsProduct();
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch subs products",
    });
  }
};
