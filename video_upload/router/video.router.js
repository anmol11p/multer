const express = require("express");
const path = require("path");
const {
  getvideouploadpage,
  postvideouploadpage,
  getallvideos,
} = require("../controller/video.controller");
const { Router } = express;
const multer = require("multer");
const { checkuserbyemail } = require("../function/function");
const videoRouter = Router();

const diskstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("public", "upload"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}_${Math.random()}${path.extname(file.originalname)}`
    );
  },
});

const videofilter = (req, file, cb) => {
  checkuserbyemail(req.body.email)
    .then((exist) => {
      if (exist) {
        return cb(new Error("user is already Existed! "), false);
      } else {
        if (file.mimetype.startsWith("video/")) {
          return cb(null, true);
        } else {
          return cb(null, false);
        }
      }
    })
    .catch((error) => {
      cb(new Error(error), false);
    });

};
const videoupload = multer({
  storage: diskstorage,
  fileFilter: videofilter,
  limits: { fileSize: 1024 * 1024 * 50 },
});
videoRouter.get("/", getvideouploadpage);
videoRouter.post("/upload", videoupload.single("video"), postvideouploadpage);
videoRouter.get("/allvideos", getallvideos);
module.exports = videoRouter;
