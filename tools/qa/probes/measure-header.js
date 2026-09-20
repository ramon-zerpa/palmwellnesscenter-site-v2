(() => {
  const R = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width) }; };
  const h = document.querySelector('header');
  const c = h && h.querySelector('.container-wide');
  const nav = h && h.querySelector('nav[aria-label="Primary"]');
  const right = c && c.lastElementChild;
  const cs = c ? getComputedStyle(c) : null;
  const padR = cs ? parseFloat(cs.paddingRight) : 0;
  const contentRight = c ? Math.round(c.getBoundingClientRect().right - padR) : null;
  const lastRight = right ? Math.round(right.getBoundingClientRect().right) : null;
  const stickyBar = document.querySelector('div.fixed.bottom-0');
  const sb = stickyBar ? stickyBar.getBoundingClientRect() : null;
  const img = document.querySelector('main img');
  return JSON.stringify({
    vw: innerWidth,
    overflowX: document.documentElement.scrollWidth - innerWidth,
    headerOverflow: lastRight !== null && contentRight !== null ? lastRight - contentRight : null,
    headerRow: R(c),
    contentRight,
    lastRight,
    nav: nav ? R(nav) : (getComputedStyle(document.querySelector('nav[aria-label="Primary"]')).display === 'none' ? 'hidden' : '?'),
    navWidth: nav ? Math.round(nav.getBoundingClientRect().width) : null,
    stickyBar: sb ? { w: Math.round(sb.width), h: Math.round(sb.height), bottom: Math.round(sb.bottom) } : false,
    heroImg: img ? { w: Math.round(img.getBoundingClientRect().width), h: Math.round(img.getBoundingClientRect().height) } : null
  });
})()
