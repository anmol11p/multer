import { readFile, writeFile } from "fs/promises";
import path from "path";

const file_path = path.join("userdata", "data.json");
const writeData = async (data) => {
  try {
    return await writeFile(file_path, JSON.stringify(data), "utf-8");
  } catch (error) {
    console.log(error);
    return;
  }
};

const readData = async () => {
  try {
    const data = await readFile(file_path, "utf-8");
    const parsedData = JSON.parse(data);

    return parsedData
      ? Array.isArray(parsedData)
        ? parsedData
        : [parsedData]
      : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
const usersExistbyEmail = async (email) => {
  try {
    const users = await readData();
    const email_exist = users.some((item) => item.email === email);
    return email_exist;
  } catch (error) {
    console.log(error);
    return;
  }
};
export { writeData, readData, usersExistbyEmail };
