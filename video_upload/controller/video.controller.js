const {
  checkuserbyemail,
  writefile,
  readfile,
} = require("../function/function");

const getvideouploadpage = (req, res, next) => {
  try {
    return res.status(201).render("videouploadpage");
  } catch (error) {
    return next({
      message: error.message ? error.message : error,
      status: 500,
    });
  }
};
const getallvideos = async (req, res, next) => {
  try {
    return res.status(201).render("allvideofile", { data: await readfile() });
  } catch (error) {
    return next({
      message: error.message ? error.message : error,
      status: 500,
    });
  }
};
const postvideouploadpage = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      next({ message: "fill all the inputs", status: 400 });
    }
    const userExist = await checkuserbyemail(email);
    if (userExist) {
      next({
        message: "user is already exist with these credentials",
        status: 400,
      });
    }
    const { filename: videopath } = req.file;
    if (!videopath) {
      next({ message: "plz upload the file", status: 400 });
    }

    // save path to data
    users = await readfile();
    users.push({ name, email, videopath });
    await writefile(users);

    return res.status(200).render("allvideofile", { data: users });
  } catch (error) {
    return next({
      message: error.message ? error.message : error,
      status: 500,
    });
  }
};

module.exports = { getvideouploadpage, postvideouploadpage, getallvideos };
