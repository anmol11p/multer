import { readData, writeData } from "../function/function.js";
export const musicuploadcontroller = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return next({ status: 400, message: "plz fill both name and email" });
    }
    const users = await readData();
    const userExist = users.some((item) => item.email === email);
    const { filename: musicfile } = req.file;
    if (!musicfile) {
      return next({ status: 400, message: "plz upload music file! " });
    }
    if (userExist) {
      return next({
        status: 400,
        message: "User is already exist with this email",
      });
    }

    // save the data
    users.push({ name, email, musicfile });
    await writeData(users);
    return res.render("allusers", { users });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

export const musicuploadpage = async (req, res, next) => {
  try {
    res.status(201).render("index");
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

export const alluserspage = async (req, res, next) => {
  try {
    res.render("allusers", { users: await readData() });
  } catch (error) {
    next({ status: 500 });
  }
};
