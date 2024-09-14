import path from "path";
import { Config } from "./Config";
import { listDirCached } from "./internal/listDirCached";
import { AnyExpression, Content, ListContent } from "./types";
import { fetchContentCached } from "./internal/fetchContentCached";
import { attributeFilter } from "./internal/attributeFilter";

export const listContent: ListContent = async (
  filters = {},
  attributes = []
) => {
  const rootDir = Config.getRootDir();

  const { type: typeFilter, slug: slugFilter, ...contentFilters } = filters;

  // Level 1, identify the files to fetch
  const filesToFetch: { type: string; slug: string }[] = [];

  const allTypes = await listDirCached(rootDir);
  const typeFilterPredicate = expressionToProvider(typeFilter);
  const typesToFetch = typeFilter
    ? allTypes.filter(typeFilterPredicate)
    : allTypes;

  await Promise.all(
    typesToFetch.map(async type => {
      const allSlugFileNames = await listDirCached(path.join(rootDir, type));
      const allSlugs = allSlugFileNames
        .filter(slug => slug.endsWith(".md"))
        .map(slug => slug.substring(0, slug.length - 3));
      const slugFilterPredicate = expressionToProvider(slugFilter);
      const slugsToFetch = slugFilter
        ? allSlugs.filter(slugFilterPredicate)
        : allSlugs;

      for (const slug of slugsToFetch) {
        filesToFetch.push({ type, slug });
      }
    })
  );

  // level 2, fetch & filter the contents from the selected files
  const allContents = await Promise.all(
    filesToFetch.map(async ({ type, slug }) => {
      return fetchContentCached(rootDir, type, slug);
    })
  );

  const contentPredicate = getContentFilterPredicate(contentFilters);

  const filteredContents = contentPredicate
    ? allContents.filter(contentPredicate)
    : allContents;

  // level 3, filter attributes
  const partialContents = filteredContents.map(content =>
    attributeFilter(content, attributes)
  );

  return partialContents;
};

const getContentFilterPredicate = (filters?: Record<string, AnyExpression>) => {
  const filterKeys = Object.keys(filters);

  if (filterKeys.length > 0) {
    const providers: Record<string, (data: unknown) => boolean> = {};
    filterKeys.forEach(key => {
      providers[key] = expressionToProvider(filters[key]);
    });

    return (content: Content) => {
      for (const key of filterKeys) {
        const provider = providers[key];
        if (!(provider && provider(content[key]))) {
          return false;
        }
      }
      return true;
    };
  }
};

const expressionToProvider = (expression: AnyExpression) => {
  if (expression === undefined) {
    return;
  }
  const fullExpression =
    expression === null ||
    typeof expression == "string" ||
    typeof expression == "number" ||
    typeof expression == "boolean"
      ? { eq: expression }
      : expression;

  const exprName = Object.keys(fullExpression)[0];
  const exprArg = Object.values(fullExpression)[0];
  const provider = Config.getFilterProvider(exprName);
  return (data: unknown) => {
    return provider(data, exprArg);
  };
};
