import { readdir } from "fs/promises";
import path from "path";

const cache: Record<string, string[]> = {};
export const listDirCached = async (dir: string): Promise<string[]> => {
  const normalizedDir = path.normalize(dir);
  if (cache[normalizedDir] === undefined) {
    cache[normalizedDir] = await readdir(normalizedDir);
  }
  return cache[normalizedDir];
};
