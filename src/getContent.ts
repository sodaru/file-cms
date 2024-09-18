import { Config } from "./Config";
import { attributeFilter } from "./internal/attributeFilter";
import { fetchContentCached } from "./internal/fetchContentCached";
import { generateSeoTags } from "./internal/seo";
import { GetContent } from "./types";

export const getContent: GetContent = async (type, slug, attributes, seo) => {
  const rootDir = Config.getRootDir();
  const content = await fetchContentCached(rootDir, type, slug);
  const filteredContent = attributeFilter(content, attributes);
  if (seo !== undefined) {
    filteredContent["_seoMetaTags"] = generateSeoTags(content, seo);
  }
  return filteredContent;
};
