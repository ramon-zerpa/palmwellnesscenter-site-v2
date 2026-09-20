(() => {
  const out = {};
  const t = document.getElementById("menu-toggle");
  const m = document.getElementById("mobile-menu");
  out.initialHidden = m.classList.contains("hidden");
  t.click();
  out.afterOpenHidden = m.classList.contains("hidden");
  out.ariaExpanded = t.getAttribute("aria-expanded");
  const sub = document.querySelector(".js-submenu");
  const panel = document.getElementById(sub.getAttribute("aria-controls"));
  out.submenuInitialHidden = panel.classList.contains("hidden");
  sub.click();
  out.submenuAfterHidden = panel.classList.contains("hidden");
  out.submenuAria = sub.getAttribute("aria-expanded");
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  out.afterEscHidden = m.classList.contains("hidden");
  out.activeId = document.activeElement.id;
  const links = [...m.querySelectorAll("a")].map(a => a.getAttribute("href"));
  out.menuLinks = links.length;
  out.stickyVisible = getComputedStyle(document.querySelector("div.fixed.bottom-0")).display !== "none";
  out.navCount = [...document.querySelectorAll('nav[aria-label="Primary"] > a, nav[aria-label="Primary"] > div')].length;
  return JSON.stringify(out);
})()
