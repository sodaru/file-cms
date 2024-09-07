import path from "path";
import { Config } from "./Config";
import { listDirCached } from "./internal/listDirCached";
import { AnyExpression, Content, ListContent, StringExpression } from "./types";
import { fetchContentCached } from "./internal/fetchContentCached";
import { attributeFilter } from "./internal/attributeFilter";

export const listContent: ListContent = async (
  filters = {},
  attributes = []
) => {
  const rootDir = Config.getRootDir();

  // Level 1, identify the files to fetch
  const filesToFetch: { type: string; slug: string }[] = [];

  const allTypes = await listDirCached(rootDir);
  const typeFilter = getStringFilterPredicate(filters.type);
  const typesToFetch = typeFilter ? allTypes.filter(typeFilter) : allTypes;

  await Promise.all(
    typesToFetch.map(async type => {
      const allSlugFileNames = await listDirCached(path.join(rootDir, type));
      const allSlugs = allSlugFileNames
        .filter(slug => slug.endsWith(".md"))
        .map(slug => slug.substring(0, slug.length - 3));
      const slugFilter = getStringFilterPredicate(filters.slug);
      const slugsToFetch = slugFilter ? allSlugs.filter(slugFilter) : allSlugs;

      for (const slug in slugsToFetch) {
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

  const contentPredicate = getContentFilterPredicate(
    filters.meta,
    filters.content
  );

  const filteredContents = contentPredicate
    ? allContents.filter(contentPredicate)
    : allContents;

  // level 3, filter attributes
  const partialContents = filteredContents.map(content =>
    attributeFilter(content, attributes)
  );

  return partialContents;
};

const getStringFilterPredicate = (stringExpr?: StringExpression) => {
  let predicate: (data: string) => boolean;
  if (stringExpr) {
    const filterExpr = sanitizeStringFilterExpressions(stringExpr);
    const filterExprName = Object.keys(filterExpr)[0];
    const provider = Config.getFilterProvider(filterExprName);
    predicate = data => {
      return provider(data, filterExpr[filterExprName]);
    };
  }
  return predicate;
};

const getContentFilterPredicate = (
  metaExpressions?: Record<string, AnyExpression>,
  contentExpression?: StringExpression
) => {
  let predicate: (content: Content) => boolean;
  const expressions = { ...(metaExpressions || {}) };
  if (contentExpression) {
    expressions.content = sanitizeStringFilterExpressions(contentExpression);
  }
  if (Object.keys(expressions).length > 0) {
    const providers: ((content: Content) => boolean)[] = [];
    for (const key in expressions) {
      const filterExpr = expressions[key];
      const filterExprName = Object.keys(filterExpr)[0];
      const provider = Config.getFilterProvider(filterExprName);
      providers.push(content => {
        return provider(content[key], filterExpr[filterExprName]);
      });
    }
    predicate = data => {
      for (const provider of providers) {
        if (!provider(data)) {
          return false;
        }
      }
      return true;
    };
  }
  return predicate;
};

const sanitizeStringFilterExpressions = (
  expr: StringExpression
): Exclude<StringExpression, string> => {
  if (typeof expr == "string") {
    return { eq: expr };
  }
  return expr;
};
