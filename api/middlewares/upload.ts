import Multer from "multer";

export const file = Multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).single("file");
