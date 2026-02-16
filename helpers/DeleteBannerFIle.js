import fs from "fs";
import path from "path";

export const deleteBannerFile = async (imgPath) => {
  const safePath = path.join("uploads/banners", path.basename(imgPath));

  return fs.promises.unlink(safePath).catch(() => null);
};
