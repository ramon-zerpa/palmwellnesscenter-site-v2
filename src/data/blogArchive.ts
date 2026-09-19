import { getCollection } from "astro:content";
import type { Lang } from "../i18n/ui";

export const BLOG_PAGE_SIZE = 6;

export interface BlogArchivePost {
  title: string;
  description: string;
  pubDate: Date;
  heroImage: string;
  url: string;
}

export interface BlogArchivePage {
  posts: BlogArchivePost[];
  currentPage: number;
  totalPages: number;
}

export async function getBlogPosts(lang: Lang): Promise<BlogArchivePost[]> {
  const all = await getCollection("blog", (entry) => entry.data.lang === lang && !entry.data.draft);
  return all
    .map((entry) => {
      const slug = String(entry.id).split("/").pop();
      const url = entry.data.path || (entry.data.lang === "en" ? `/${slug}/` : `/es/${slug}/`);
      return { ...entry.data, url };
    })
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}

export async function getBlogTotalPages(lang: Lang, pageSize = BLOG_PAGE_SIZE): Promise<number> {
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
  };
}
