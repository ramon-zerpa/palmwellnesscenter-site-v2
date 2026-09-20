// Single icon source for the whole site: Lucide (https://lucide.dev).
//
// Before this module the project had two hand-maintained sets — `Icon.astro`
// carried trimmed 24px stroke paths plus four custom filled shapes, and
// `FaIcon.astro` carried Font Awesome solid glyphs harvested from the old
// WordPress build. They mixed two drawing conventions (stroke vs fill), several
// optical weights and a few shapes that read as hand-drawn. On top of that,
// `Icon.astro` silently fell back to a checkmark for any unknown name, so
// mistyped icons shipped as ticks instead of failing.
//
// Now every icon resolves here. Legacy names (mostly Font Awesome) are aliased
// onto their Lucide equivalent, and an unknown name throws at build time.
import fs from "node:fs";
import path from "node:path";

const ALIAS: Record<string, string> = {
  // Font Awesome / legacy names used by the interior rich pages
  "check-circle": "circle-check",
  "check-square-o": "square-check-big",
  "exclamation-circle": "circle-alert",
  "exclamation-triangle": "triangle-alert",
  "file-text-o": "file-text",
  "user-md": "user-round",
  "sign-language": "hand",
  "automobile": "car",
  "child": "baby",
  "heartbeat": "heart-pulse",
  "medkit": "briefcase-medical",
  "search-plus": "search",
  "volume-up": "volume-2",
  "male": "mars",
  "female": "venus",
  "blind": "accessibility",
  "group": "users",
  "hand-paper-o": "hand",
  "plus-square": "square-plus",
  "arrows": "move",
  "user-times": "user-x",
  // Short names used by this codebase
  arrow: "arrow-right",
  drop: "droplet",
  spine: "bone",
  alert: "triangle-alert",
  person: "user-round",
};

const DIR = path.join(process.cwd(), "node_modules", "lucide-static", "icons");
const cache = new Map<string, string>();

/** Inner markup (children only) of the Lucide SVG for `name`. */
export function lucideInner(name: string): string {
  const file = ALIAS[name] ?? name;
  const cached = cache.get(file);
  if (cached !== undefined) return cached;

  const svgPath = path.join(DIR, `${file}.svg`);
  if (!fs.existsSync(svgPath)) {
    throw new Error(
      `[icons] "${name}"${file === name ? "" : ` (alias → "${file}")`} is not a Lucide icon. ` +
        `Pick a real name from node_modules/lucide-static/icons, or add an alias in src/lib/lucide.ts.`,
    );
  }

  const svg = fs.readFileSync(svgPath, "utf8");

  // lucide-static files start with a `<!-- @license … -->` comment whose closing
  // `-->` contains a `>`. Naively slicing from the first `>` therefore left the
  // whole `<svg>` tag in place, producing a nested `<svg>`; the HTML parser then
  // entered SVG insertion mode and silently dropped every following sibling text
  // node (button labels, list items). Strip comments and anchor on `<svg` first.
  const body = svg.replace(/<!--[\s\S]*?-->/g, "");
  const inner = body
    .slice(body.indexOf(">", body.indexOf("<svg")) + 1, body.lastIndexOf("</svg>"))
    .trim();
  cache.set(file, inner);
  return inner;
}
