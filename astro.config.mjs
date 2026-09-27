// @ts-check
import { existsSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import sharp from "sharp";
import rehypeTableLabels from "./src/lib/rehype-table-labels.mjs";

const rootDir = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(rootDir, "public");
const publicDirPrefix = publicDir.endsWith(sep) ? publicDir : `${publicDir}${sep}`;
const imageMetaCache = new Map();

async function getLocalImageMeta(src) {
  const cleanSrc = String(src || "").split(/[?#]/)[0];
  if (!cleanSrc.startsWith("/")) return null;

  const imagePath = resolve(publicDir, cleanSrc.replace(/^\/+/, ""));
  if (!imagePath.startsWith(publicDirPrefix) || !existsSync(imagePath)) return null;

  if (!imageMetaCache.has(imagePath)) {
    imageMetaCache.set(
      imagePath,
      sharp(imagePath)
        .metadata()
        .then(({ width, height }) => (width && height ? { width, height } : null))
        .catch(() => null),
    );
  }

  return imageMetaCache.get(imagePath);
}

function collectImageNodes(node, images = []) {
  if (node?.type === "element" && node.tagName === "img") {
    images.push(node);
  }

  for (const child of node?.children || []) {
    collectImageNodes(child, images);
  }

  return images;
}

function rehypeLocalImageDimensions() {
  return async (tree) => {
    const images = collectImageNodes(tree);

    await Promise.all(
      images.map(async (node) => {
        node.properties ||= {};
        const meta = await getLocalImageMeta(node.properties.src);

        if (meta) {
          node.properties.width ||= meta.width;
          node.properties.height ||= meta.height;
        }

        node.properties.loading ||= "lazy";
        node.properties.decoding ||= "async";
      }),
    );
  };
}

export default defineConfig({
  site: "https://www.palmwellness.center",
  output: "static",
  build: {
    inlineStylesheets: "always", // eliminate render-blocking CSS
  },
  markdown: {
    rehypePlugins: [rehypeLocalImageDimensions, rehypeTableLabels],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false, // "/" = English, "/es/..." = Spanish
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es" },
      },
    }),
  ],
});
