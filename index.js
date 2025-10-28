import path from "path";
import express from "express";
import multer from "multer";
import { writeFile } from "fs/promises";
import {
  readData,
  usersExistbyEmail,
  writeData,
} from "./Functions/function.js";
const app = express();

// server public file

const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, "public")));

const fileuploadHtml = path.join(__dirname, "views", "fileupload.ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

// set multer destination
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/avatar");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${Date.now()}_${Math.random()}${extname}`);
  },
});

// set filter
const avatarfileFilter = async (req, file, cb) => {
  const userExist = await usersExistbyEmail(req.body.email);
  if (userExist) {
    cb(new Error("User is already existed..."), false);
  } else {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("only image files are allowed"), false);
    }
  }
};

const avatarupload = multer({
  storage: avatarStorage,
  fileFilter: avatarfileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, //5mb
});

app.get("/", (req, res) => {
  res.render("fileupload");
});

app.post("/userInfo", avatarupload.single("avatar"), async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!req.file) {
      res.status(400).json({ msg: "Plz upload image" });
    }
    const { filename } = req.file;
    const usersExist = await usersExistbyEmail(email);
    if (usersExist) {
      return res
        .status(400)
        .json({ msg: "User is already existed with this email id" });
    }
    const users = await readData();
    users.push({ username, email, imgSrc: filename });
    await writeData(users);
    res.status(201).redirect("/userInfo");
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/userInfo", async (req, res) => {
  try {
    res.render("userInfo", { userData: await readData() });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});
const port = 3000;

app.listen(port, () => {
  console.log(`server is listen at ${port}`);
});
