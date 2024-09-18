import { Content, SeoAttribute, SeoSettings, SeoTag } from "../types";

const getDefaultSeoSettings = () => ({
  title: { key: "title", default: "" },
  description: { key: "description", default: "" },
  image: { key: "image", default: "" },
  imageWidth: { key: "imageWidth", default: "" },
  imageHeight: { key: "imageHeight", default: "" },
  locale: { key: "locale", default: "en" },
  siteName: { key: "siteName", default: "" },
  seoType: { key: "seoType", default: "website" },
  twitterCard: { key: "twitterCard", default: "summary_large_image" },
  twitterSite: { key: "twitterSite", default: "" }
});

export const generateSeoTags = (
  content: Content,
  seo: SeoSettings
): SeoTag[] => {
  const seoSettings = getDefaultSeoSettings();
  if (typeof seo === "object") {
    for (const key of Object.keys(seo)) {
      const providedKey = (
        typeof seo[key] == "string" ? { key: seo[key] } : seo[key]
      ) as Exclude<SeoAttribute, string>;
      seoSettings[key] = { ...seoSettings[key], ...providedKey };
    }
  }

  const _seoMetaTags: SeoTag[] = [];

  _seoMetaTags.push(...generateTitleSeoTags(content, seoSettings.title));
  _seoMetaTags.push(
    ...generateDescriptionSeoTags(content, seoSettings.description)
  );
  _seoMetaTags.push(
    ...generateImageSeoTags(
      content,
      seoSettings.image,
      seoSettings.imageWidth,
      seoSettings.imageHeight
    )
  );
  _seoMetaTags.push(...generateLocaleSeoTags(content, seoSettings.locale));
  _seoMetaTags.push(...generateSiteNameSeoTags(content, seoSettings.siteName));
  _seoMetaTags.push(...generateSeoTypeSeoTags(content, seoSettings.seoType));
  _seoMetaTags.push(
    ...generateTwitterCardSeoTags(content, seoSettings.twitterCard)
  );
  _seoMetaTags.push(
    ...generateTwitterSiteSeoTags(content, seoSettings.twitterSite)
  );

  return _seoMetaTags;
};

const getSeoValueFromContent = (
  content: Content,
  seoSettings: Required<Exclude<SeoAttribute, string>>
) => {
  return content[seoSettings.key] !== undefined
    ? (content[seoSettings.key] as string)
    : seoSettings.default;
};

const generateTitleSeoTags = (
  content: Content,
  titleSeoSettings: Required<Exclude<SeoAttribute, string>>
) => {
  const _seoMetaTags: SeoTag[] = [];

  const title = getSeoValueFromContent(content, titleSeoSettings);

  if (title) {
    _seoMetaTags.push({
      attributes: {},
      content: title,
      tag: "title"
    });

    _seoMetaTags.push({
      attributes: {
        property: "og:title",
        content: title
      },
      content: null,
      tag: "meta"
    });

    _seoMetaTags.push({
      attributes: {
        name: "twitter:title",
        content: title
      },
      content: null,
      tag: "meta"
    });
  }

  return _seoMetaTags;
};

const generateDescriptionSeoTags = (
  content: Content,
  descriptionSeoSettings: Required<Exclude<SeoAttribute, string>>
) => {
  const _seoMetaTags: SeoTag[] = [];

  const description = getSeoValueFromContent(content, descriptionSeoSettings);

  if (description) {
    _seoMetaTags.push({
      attributes: {
        name: "description",
        content: description
      },
      content: null,
      tag: "meta"
    });
    _seoMetaTags.push({
      attributes: {
        property: "og:description",
        content: description
      },
      content: null,
      tag: "meta"
    });

    _seoMetaTags.push({
      attributes: {
        name: "twitter:description",
        content: description
      },
      content: null,
      tag: "meta"
    });
  }

  return _seoMetaTags;
};

const generateImageSeoTags = (
  content: Content,
  imageSeoSettings: Required<Exclude<SeoAttribute, string>>,
  imageWidthSeoSettings: Required<Exclude<SeoAttribute, string>>,
  imageHeightSeoSettings: Required<Exclude<SeoAttribute, string>>
) => {
  const _seoMetaTags: SeoTag[] = [];
  const image = getSeoValueFromContent(content, imageSeoSettings);
  if (image) {
    _seoMetaTags.push({
      attributes: {
        property: "og:image",
        content: image
      },
      content: null,
      tag: "meta"
    });

    const imageWidth = getSeoValueFromContent(content, imageWidthSeoSettings);
    if (imageWidth) {
      _seoMetaTags.push({
        attributes: {
          property: "og:image:width",
          content: imageWidth
        },
        content: null,
        tag: "meta"
      });
    }

    const imageHeight = getSeoValueFromContent(content, imageHeightSeoSettings);
    if (imageHeight) {
      _seoMetaTags.push({
        attributes: {
          property: "og:image:height",
          content: imageHeight
        },
        content: null,
        tag: "meta"
      });
    }
  }

  return _seoMetaTags;
};

const generateLocaleSeoTags = (
  content: Content,
  localeSeoSettings: Required<Exclude<SeoAttribute, string>>
) => {
  const _seoMetaTags: SeoTag[] = [];
  const locale = getSeoValueFromContent(content, localeSeoSettings);
  if (locale) {
    _seoMetaTags.push({
      attributes: {
        property: "og:locale",
        content: locale
      },
      content: null,
      tag: "meta"
    });
  }

  return _seoMetaTags;
};

const generateSiteNameSeoTags = (
  content: Content,
  siteNameSeoSettings: Required<Exclude<SeoAttribute, string>>
) => {
  const _seoMetaTags: SeoTag[] = [];
  const siteName = getSeoValueFromContent(content, siteNameSeoSettings);
  if (siteName) {
    _seoMetaTags.push({
      attributes: {
        property: "og:site_name",
        content: siteName
      },
      content: null,
      tag: "meta"
    });
  }

  return _seoMetaTags;
};

const generateSeoTypeSeoTags = (
  content: Content,
  seoTypeSeoSettings: Required<Exclude<SeoAttribute, string>>
) => {
  const _seoMetaTags: SeoTag[] = [];
  const seoType = getSeoValueFromContent(content, seoTypeSeoSettings);
  if (seoType) {
    _seoMetaTags.push({
      attributes: {
        property: "og:type",
        content: seoType
      },
      content: null,
      tag: "meta"
    });
  }

  return _seoMetaTags;
};

const generateTwitterCardSeoTags = (
  content: Content,
  twitterCardSeoSettings: Required<Exclude<SeoAttribute, string>>
) => {
  const _seoMetaTags: SeoTag[] = [];
  const twitterCard = getSeoValueFromContent(content, twitterCardSeoSettings);
  if (twitterCard) {
    _seoMetaTags.push({
      attributes: {
        name: "twitter:card",
        content: twitterCard
      },
      content: null,
      tag: "meta"
    });
  }

  return _seoMetaTags;
};

const generateTwitterSiteSeoTags = (
  content: Content,
  twitterSiteSeoSettings: Required<Exclude<SeoAttribute, string>>
) => {
  const _seoMetaTags: SeoTag[] = [];
  const twitterSite = getSeoValueFromContent(content, twitterSiteSeoSettings);
  if (twitterSite) {
    _seoMetaTags.push({
      attributes: {
        name: "twitter:site",
        content: twitterSite
      },
      content: null,
      tag: "meta"
    });
  }

  return _seoMetaTags;
};
