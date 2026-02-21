import { db } from "../config/db.js";
import { cleanupUploads } from "../helpers/Cleanup.js";
import { deleteBannerFile } from "../helpers/DeleteBannerFIle.js";
import {
  fetchBanners,
  fetchBannersBySp,
  handleBanners,
} from "../services/banners.services.js";

export const manageBanners = async (req, res) => {
  const files = req.files || [];
  const deletedImages = JSON.parse(req.body.deletedImages || "[]");

  try {
    const existing = await db.query.banners.findFirst();

    const uploadedPaths = files.map((f) => f.path.replace(/\\/g, "/"));

    const finalImages = [...existing.images];

    deletedImages.forEach((deletedPath) => {
      const index = finalImages.indexOf(deletedPath);
      if (index !== -1) finalImages[index] = null;
    });

    uploadedPaths.forEach((newPath) => {
      const replaceIndex = finalImages.indexOf(null);

      if (replaceIndex !== -1) {
        finalImages[replaceIndex] = newPath;
      } else {
        finalImages.push(newPath);
      }
    });

    const cleanedImages = finalImages.filter(Boolean);

    if (!cleanedImages.length) {
      await cleanupUploads(files);
      return res.status(400).json({
        success: false,
        message: "At least one banner image is required",
      });
    }

    if (cleanedImages.length > 10) {
      await cleanupUploads(files);
      return res.status(400).json({
        success: false,
        message: "Maximum 10 banner images allowed",
      });
    }

    await handleBanners(cleanedImages);

    await Promise.all(
      deletedImages.map((imgPath) => deleteBannerFile(imgPath)),
    );

    return res.status(200).json({
      success: true,
      message: "Banners updated successfully",
      images: cleanedImages,
    });
  } catch (err) {
    console.error("Save banners failed:", err);
    await cleanupUploads(files);

    return res.status(500).json({
      success: false,
      message: "Failed to save banners",
    });
  }
};

export const pullBanners = async (req, res) => {
  try {
    const banners = await fetchBanners();
    return res.status(200).json(banners);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
    });
  }
};

export const pullBannerBySpecials = async (req, res) => {
  try {
    const banners = await fetchBannersBySp();
    return res.status(200).json(banners);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch banners with specials",
    });
  }
};
