import { Config } from "./Config";
import { attributeFilter } from "./internal/attributeFilter";
import { fetchContentCached } from "./internal/fetchContentCached";
import { GetContent } from "./types";

export const getContent: GetContent = async (type, slug, attributes) => {
  const rootDir = Config.getRootDir();
  const content = await fetchContentCached(rootDir, type, slug);
  return attributeFilter(content, attributes);
};
