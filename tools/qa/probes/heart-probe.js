(async () => {
  const el = document.querySelector(".hero-heart");
  const seen = new Set();
  let min = 99;
  let max = 0;
  for (let i = 0; i < 20; i++) {
    const t = getComputedStyle(el).transform;
    seen.add(t);
    const m = t.match(/matrix\(([-\d.]+)/);
    if (m) {
      const s = parseFloat(m[1]);
      if (s < min) min = s;
      if (s > max) max = s;
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  return JSON.stringify({
    distinctTransforms: seen.size,
    scaleMin: min,
    scaleMax: max,
    samples: [...seen].slice(0, 6),
  }, null, 1);
})()
