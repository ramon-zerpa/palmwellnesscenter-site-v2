(() => {
  const sel = ["#menu-toggle", "div.fixed.bottom-0 a", ".js-submenu", 'nav[aria-label="Primary"] a'];
  const out = {};
  for (const s of sel) {
    const els = [...document.querySelectorAll(s)];
    out[s] = els.slice(0,3).map(e => { const r = e.getBoundingClientRect(); return Math.round(r.width) + "x" + Math.round(r.height); });
  }
  const st = document.querySelector("div.fixed.bottom-0 a");
  const cs = getComputedStyle(st);
  out.stickyCta = { color: cs.color, bg: cs.backgroundColor, fontSize: cs.fontSize };
  out.h1 = document.querySelector("h1").textContent.trim();
  out.footerTagline = document.querySelector("footer p") ? document.querySelector("footer p").textContent.trim().slice(0,60) : null;
  out.navLabels = [...document.querySelectorAll('nav[aria-label="Primary"] > a, nav[aria-label="Primary"] > div > a')].map(a => a.textContent.trim().replace(/\s+/g," "));
  return JSON.stringify(out);
})()
