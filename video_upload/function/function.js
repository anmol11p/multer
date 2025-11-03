const path = require("path");
const { readFile, writeFile } = require("fs/promises");
const file_path = path.join("data", "videoData.json");
const readfile = async () => {
  try {
    const data = await readFile(file_path, "utf-8");
    if (!data) return [];
    const parsedData = JSON.parse(data);
    if (!parsedData) return [];
    return Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const writefile = async (content) => {
  try {
    return await writeFile(
      file_path,
      JSON.stringify(content, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.log(error);
    return;
  }
};

const checkuserbyemail = async (email) => {
  try {
    const users = await readfile();
    return users.some((item) => {
      return item.email === email;
    })
      ? true
      : false;
  } catch (error) {
    console.log(error);
    return;
  }
};
module.exports = { readfile, writefile, checkuserbyemail };
