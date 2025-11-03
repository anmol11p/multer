import { readFile, writeFile } from "fs/promises";
import path from "path";
const filePath = path.join("data", "userData.json");
const readData = async () => {
  try {
    const data = await readFile(filePath, "utf-8");
    if (!data) {
      return [];
    }
    const parsedData = JSON.parse(data);

    return Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    return [];
  }
};

const writeData = async (data) => {
  try {
    return await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    return error;
  }
};
export { readData, writeData };
