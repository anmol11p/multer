import express from "express";
import path from "path";
import musicRouter from "./router/router.js";
import { errorMiddleware } from "./middleware/Error.middleware.js";
const app = express();

app.use(express.json());
const path_of_public = path.join(import.meta.dirname, "public");
app.use(express.static(path_of_public));
app.set("view engine", "ejs");

// router
app.use("/", musicRouter);

// error middleware
app.use(errorMiddleware);
const port = 3000;
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
