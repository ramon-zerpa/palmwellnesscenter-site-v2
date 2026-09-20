(() => {
  const parts = [];
  const els = document.querySelectorAll('body *');
  const max = Math.min(els.length, 1600);
  for (let i = 0; i < max; i++) {
    const e = els[i];
    const cs = getComputedStyle(e);
    const r = e.getBoundingClientRect();
    parts.push([
      e.tagName,
      String(e.className).slice(0, 70),
      cs.color,
      cs.backgroundColor,
      cs.fontSize,
      cs.fontFamily,
      cs.display,
      Math.round(r.width),
      cs.marginTop,
      cs.marginBottom,
      cs.paddingTop,
      cs.borderTopColor,
      cs.textDecorationLine,
      cs.borderRadius
    ].join('~'));
  }
  return parts.join('\n');
})()
