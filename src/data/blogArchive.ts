import { getCollection } from "astro:content";
import type { Lang } from "../i18n/ui";

/**
 * Posts per archive page. DO NOT change without re-verifying the legacy
 * pagination URLs: `seo/sitemap-baseline.xml` indexes `/news-blog/2/` …
 * `/news-blog/16/` (and the ES mirror). With 92 EN / 93 ES posts, 6 per page is
 * exactly what produces those 16 pages.
 */
export const BLOG_PAGE_SIZE = 6;

export interface BlogArchivePost {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage: string;
  /** Filename slug (no language prefix) — used to exclude the current post. */
  slug: string;
  url: string;
}

export interface BlogArchivePage {
  posts: BlogArchivePost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

function toArchivePost(entry: {
  id: string;
  data: {
    lang: Lang;
    title: string;
    description?: string;
    pubDate: Date;
    updatedDate?: Date;
    heroImage?: string;
    path?: string;
    altPath?: string;
  };
}): BlogArchivePost {
  const slug = String(entry.id).split("/").pop() as string;
  const url =
    entry.data.path || (entry.data.lang === "en" ? `/${slug}/` : `/es/${slug}/`);
  return {
    title: entry.data.title,
    description: entry.data.description || "",
    pubDate: entry.data.pubDate,
    updatedDate: entry.data.updatedDate,
    heroImage: entry.data.heroImage || "",
    slug,
    url,
  };
}

export async function getBlogPosts(lang: Lang): Promise<BlogArchivePost[]> {
  const all = await getCollection(
    "blog",
    (entry) => entry.data.lang === lang && !entry.data.draft,
  );
  return all
    .map((entry) => toArchivePost(entry))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}

export async function getBlogTotalPages(
  lang: Lang,
  pageSize = BLOG_PAGE_SIZE,
): Promise<number> {
  const posts = await getBlogPosts(lang);
  return Math.max(1, Math.ceil(posts.length / pageSize));
}

export async function getBlogArchivePage(
  lang: Lang,
  currentPage = 1,
  pageSize = BLOG_PAGE_SIZE,
): Promise<BlogArchivePage> {
  const posts = await getBlogPosts(lang);
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    posts: posts.slice(start, start + pageSize),
    currentPage: safePage,
    totalPages,
    totalPosts: posts.length,
  };
}

export async function getBlogRecentPosts(
  lang: Lang,
  { excludeSlug, limit = 5 }: { excludeSlug?: string; limit?: number } = {},
): Promise<BlogArchivePost[]> {
  const posts = await getBlogPosts(lang);
  return posts.filter((post) => post.slug !== excludeSlug).slice(0, limit);
}

export type BlogPaginationItem =
  | { type: "page"; page: number }
  | { type: "ellipsis" };

const PAGINATION_BOUNDARY = 3;
const PAGINATION_SIBLING = 1;

/**
 * Stable pagination window. Small archives expose every page; larger ones keep
 * the first and last three pages plus the current page and its neighbours,
 * inserting non-interactive ellipses for omitted ranges.
 */
export function getBlogPaginationItems(
  currentPage: number,
  totalPages: number,
): BlogPaginationItem[] {
  if (totalPages < 1) return [];
  if (currentPage < 1 || currentPage > totalPages) {
    throw new RangeError("Current page is outside the archive range.");
  }
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => ({
      type: "page" as const,
      page: index + 1,
    }));
  }

  const visible = new Set<number>();
  const addRange = (start: number, end: number) => {
    for (let page = start; page <= end; page += 1) {
      if (page >= 1 && page <= totalPages) visible.add(page);
    }
  };
  addRange(1, PAGINATION_BOUNDARY);
  addRange(totalPages - PAGINATION_BOUNDARY + 1, totalPages);
  addRange(currentPage - PAGINATION_SIBLING, currentPage + PAGINATION_SIBLING);

  const ordered = [...visible].sort((a, b) => a - b);
  const items: BlogPaginationItem[] = [];
  ordered.forEach((page, index) => {
    const previous = ordered[index - 1];
    if (previous && page - previous > 1) items.push({ type: "ellipsis" });
    items.push({ type: "page", page });
  });
  return items;
}
