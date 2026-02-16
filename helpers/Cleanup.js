import fs from "fs";

export const cleanupUploads = async (files) => {
  if (!files.length) return;

  await Promise.all(
    files.map((file) => fs.promises.unlink(file.path).catch(() => null)),
  );
};
