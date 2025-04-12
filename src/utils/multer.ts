import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";
import { allowedFileTypes } from "./zodSchema";

// Konfigurasi penyimpanan untuk thumbnail
export const thumbnailStorage = (path = "public/uploads/thumbnails") =>
  multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, path);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const extension = file.mimetype.split("/")[1];
      const filename = `${file.fieldname}-${uniqueSuffix}.${extension}`;
      cb(null, filename);
    },
  });

// Filter file berdasarkan mimetype
export const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!allowedFileTypes.includes(file.mimetype)) {
    return cb(null, false);
  }
  cb(null, true);
};
