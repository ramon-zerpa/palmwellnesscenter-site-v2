(() => {
  const edge = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const pl = parseFloat(cs.paddingLeft), pr = parseFloat(cs.paddingRight);
    return { boxW: Math.round(r.width), contentL: Math.round(r.left + pl), contentR: Math.round(r.right - pr), contentW: Math.round(r.width - pl - pr) };
  };
  const rows = [...document.querySelectorAll('.shell')];
  const header = document.querySelector('header .shell');
  const footer = document.querySelector('footer .shell');
  return JSON.stringify({
    vw: innerWidth,
    overflowX: document.documentElement.scrollWidth - innerWidth,
    shellCount: rows.length,
    header: edge(header),
    footer: edge(footer),
    mainFirst: edge(document.querySelector('main .shell')),
    headerOverflow: (() => {
      const h = document.querySelector('header .shell');
      if (!h) return null;
      const pr = parseFloat(getComputedStyle(h).paddingRight);
      return Math.round(h.lastElementChild.getBoundingClientRect().right - (h.getBoundingClientRect().right - pr));
    })(),
    navWidth: (() => { const n = document.querySelector('nav[aria-label="Primary"]'); return n && getComputedStyle(n).display !== 'none' ? Math.round(n.getBoundingClientRect().width) : null; })(),
    stickyBar: !!document.querySelector('div.fixed.bottom-0'),
    h1: document.querySelectorAll('h1').length
  });
})()
