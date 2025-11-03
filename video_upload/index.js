const express = require("express");
const path = require("path");
const app = express();
const Errormiddleware = require("./middleware/error.middleware");
const videoRouter = require("./router/video.router");
// middleware

//?json
app.use(express.json());
//? ejs
app.set("view engine", "ejs");
//?static file serve
app.use(express.static(path.join(__dirname, "public")));

// router
app.use("/", videoRouter);

// error handling
app.use(Errormiddleware);
const port = 5000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
