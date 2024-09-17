import { join } from "path";
import { Config } from "./Config";
import { readFile } from "fs/promises";
import { FileNotFoundError } from "./errors/FileNotFoundError";

export const getFile = (
  path: string,
  options?: Parameters<typeof readFile>["1"]
) => {
  const rootDir = Config.getRootDir();
  const filePath = join(rootDir, path);
  try {
    return readFile(filePath, options);
  } catch (e) {
    throw new FileNotFoundError(rootDir, path, e);
  }
};
