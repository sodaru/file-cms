import { AttributeFilter, Content } from "../types";

export const attributeFilter = (
  content: Content,
  attributes: AttributeFilter = []
): Partial<Content> => {
  const partialContent: Partial<Content> = {};

  const attributesToFilter =
    attributes.length == 0 ? Object.keys(content) : [...attributes];

  for (const attr of attributesToFilter) {
    partialContent[attr] = content[attr];
  }

  return partialContent;
};
