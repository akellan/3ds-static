import multer from "multer";
import { Express } from "express";

export function registerUploadDestination(
  app: Express,
  folder: string,
  multipartId: string
) {
  var storage = multer.diskStorage({
    destination: function(_, __, cb) {
      cb(null, folder);
    },
    filename: function(_, file, cb) {
      cb(null, file.originalname);
    }
  });

  var staticUpload = multer({ storage });

  app.post("/upload", staticUpload.single(multipartId), (_, res) => {
    res.send("ok");
  });
}
