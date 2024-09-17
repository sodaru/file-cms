import path from "path";
import { Content } from "../types";
import { readFile } from "fs/promises";
import { parseContent } from "./parseContent";
import { NotFoundError } from "../errors/NotFoundError";

const cache: Record<string, Content> = {};

export const fetchContentCached = async (
  rootDir: string,
  type: string,
  slug: string
): Promise<Content> => {
  const normalizedPath = path.normalize(path.join(rootDir, type, slug + ".md"));
  if (cache[normalizedPath] == undefined) {
    const fileContents = await readContentFile(rootDir, type, slug);
    const content = parseContent(fileContents, type, slug);
    cache[normalizedPath] = content;
  }
  return cache[normalizedPath];
};

const readContentFile = async (rootDir: string, type: string, slug: string) => {
  try {
    return await readFile(path.join(rootDir, type, slug + ".md"), "utf8");
  } catch (e) {
    throw new NotFoundError(rootDir, type, slug, e);
  }
};
