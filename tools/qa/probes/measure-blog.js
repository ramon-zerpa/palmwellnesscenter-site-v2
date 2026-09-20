(() => {
  const pick = (sel) => { const e = document.querySelector(sel); if (!e) return null; return { sel, w: Math.round(e.getBoundingClientRect().width), maxw: getComputedStyle(e).maxWidth }; };
  return JSON.stringify([pick('.container.max-w-4xl'), pick('.container.max-w-6xl'), pick('article .container'), pick('main .container')]);
})()
