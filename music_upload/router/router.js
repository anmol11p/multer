import { Router } from "express";
import {
  alluserspage,
  musicuploadcontroller,
  musicuploadpage,
} from "../controller/controller.js";
import multer from "multer";
import path from "path";
import { readData } from "../function/function.js";
const musicRouter = Router();

// storage-> destination,filename
const musicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploadMusic");
  },
  filename: (req, file, cb) => {
    const extensionName = path.extname(file.originalname);
    cb(null, `${Date.now()}_${Math.random()}${extensionName}`);
  },
});
// filter
const musicfilter = async (req, file, cb) => {
  const users = await readData();

  const musicExist = users.some(
    (item) => item.musicfile && item.email === req.body.email
  );
  if (musicExist) {
    cb(Error("user is already existed>"), false);
  } else {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(Error("only mp3 file is allowed to upload"), false);
    }
  }
};

const musicupload = multer({
  storage: musicStorage,
  fileFilter: musicfilter,
  limits: { fileSize: 1024 * 1024 * 20 }, //20 mb
});

musicRouter.route("/").get(musicuploadpage);
musicRouter.route("/").post(musicupload.single("music"), musicuploadcontroller);
musicRouter.route("/allusers").get(alluserspage);
export default musicRouter;
