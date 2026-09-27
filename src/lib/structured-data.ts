// JSON-LD builders shared by the blog (and reusable elsewhere).
//
// The site origin lives here so every schema emits absolute URLs without each
// caller having to remember to prefix them. Import these from page wrappers and
// pass the result to <Layout structuredData={[...]}>.

export const SITE_ORIGIN = "https://www.palmwellness.center";

function absolute(url: string): string {
  return url.startsWith("http") ? url : SITE_ORIGIN + url;
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  path: string;
  image?: string;
  authorName: string;
  publishedAt: Date;
  updatedAt?: Date;
}

export function createArticleSchema(article: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": absolute(article.path) },
    ...(article.image ? { image: absolute(article.image) } : {}),
    author: { "@type": "Organization", name: article.authorName },
    publisher: {
      "@type": "Organization",
      name: "Palm Wellness Center",
      logo: { "@type": "ImageObject", url: absolute("/images/logo.webp") },
    },
    datePublished: article.publishedAt.toISOString(),
    dateModified: (article.updatedAt ?? article.publishedAt).toISOString(),
  } as const;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function createBreadcrumbSchema(items: ReadonlyArray<BreadcrumbItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  } as const;
}

export interface ItemListSchemaInput {
  name: string;
  description: string;
  path: string;
  startPosition?: number;
  items: ReadonlyArray<{ name: string; path: string }>;
}

export function createItemListSchema(list: ItemListSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: list.name,
    description: list.description,
    url: absolute(list.path),
    numberOfItems: list.items.length,
    itemListElement: list.items.map((item, index) => ({
      "@type": "ListItem",
      position: (list.startPosition ?? 1) + index,
      name: item.name,
      url: absolute(item.path),
    })),
  } as const;
}
