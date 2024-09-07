import { Content } from "../types";
import * as yaml from "yaml";

export const parseContent = (
  rawContent: string,
  type: string,
  slug: string
): Content => {
  const rawTrimmed = rawContent.trim();
  let content = rawTrimmed;
  let meta: Record<string, unknown> = {};
  if (content.startsWith("```YAML")) {
    const metaEndsAt = content.indexOf("\n```", 7); // length of ```YAML == 7
    if (metaEndsAt > 7) {
      const metaData = content.substring(7, metaEndsAt);
      content = content.substring(metaEndsAt + 4).trim();
      meta = yaml.parse(metaData);
    }
  }

  return {
    type,
    slug,
    content,
    ...meta
  };
};
