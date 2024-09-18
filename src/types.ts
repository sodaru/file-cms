export type AttributeFilter = string[];

export type SeoTag = {
  tag: string;
  content: string | null;
  attributes: Record<string, string>;
};

export type Content = {
  type: string;
  slug: string;
  content: string;
  _seoMetaTags?: SeoTag[];
} & Record<string, unknown>;

export type SeoAttribute =
  | string
  | {
      key?: string;
      default?: string;
    };

export type SeoSettings =
  | true
  | ({
      title?: SeoAttribute;
      description?: SeoAttribute;
      image?: SeoAttribute;
      imageWidth?: SeoAttribute;
      imageHeight?: SeoAttribute;
      locale?: SeoAttribute;
      siteName?: SeoAttribute;
      seoType?: SeoAttribute;
      twitterCard?: SeoAttribute;
      twitterSite?: SeoAttribute;
    } & Record<string, SeoAttribute>);

export type GetContent = (
  type: string,
  slug: string,
  attributes?: AttributeFilter,
  seo?: SeoSettings
) => Promise<Partial<Content>>;

export type FilterProvider = (data: unknown, arg: unknown) => boolean;

export type GeneralExpression = Record<string, unknown>;
export type EqExpression = { eq: string | number | boolean | null };
export type StartsWithExpression = { startsWith: string };
export type EndsWithExpression = { endsWith: string };
export type ContainsExpression = { contains: string };
export type GtExpression = { gt: number };
export type LtExpression = { lt: number };
export type GteExpression = { gte: number };
export type LteExpression = { lte: number };
export type BetweenExpression = { between: [number, number] };
export type BetweenInclusiveExpression = { betweenInclusive: [number, number] };
export type HasExpression = { has: string | number | boolean | null };

export type StringExpression =
  | string
  | EqExpression
  | StartsWithExpression
  | EndsWithExpression
  | ContainsExpression
  | GeneralExpression;

export type TypeExpression = StringExpression;

export type SlugExpression = StringExpression;

export type ContentExpression = StringExpression;

export type AnyExpression =
  | string
  | number
  | boolean
  | null
  | GeneralExpression
  | EqExpression
  | StartsWithExpression
  | EndsWithExpression
  | ContainsExpression
  | GtExpression
  | LtExpression
  | GteExpression
  | LteExpression
  | BetweenExpression
  | HasExpression;

export type ListContent = (
  filters?: {
    type?: TypeExpression;
    slug?: SlugExpression;
    content?: ContentExpression;
  } & Record<string, AnyExpression>,
  attributes?: AttributeFilter,
  sort?: (a: Content, b: Content) => number
) => Promise<Partial<Content>[]>;
