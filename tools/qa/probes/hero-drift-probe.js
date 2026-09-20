(() => {
  const hero = document.querySelector("main section");
  const pulse = document.querySelector(".hero-pulse");
  const rail = hero.querySelector("dl");
  const frame = document.querySelector(".hero-media-frame");
  const inner = document.querySelector(".hero-media");
  const fs = getComputedStyle(frame);
  const is = getComputedStyle(inner);

  const hr = hero.getBoundingClientRect();
  const pr = pulse.getBoundingClientRect();
  const rr = rail.getBoundingClientRect();

  return JSON.stringify({
    gapAbove_rail_to_pulse: Math.round(pr.top - rr.bottom),
    gapBelow_pulse_to_sectionEnd: Math.round(hr.bottom - pr.bottom),
    centred: Math.abs((pr.top - rr.bottom) - (hr.bottom - pr.bottom)) <= 1,
    frameShadow: fs.boxShadow,
    frameRadius: fs.borderRadius,
    innerClip: is.clipPath,
    innerOverflow: is.overflow,
    frameHeight: Math.round(frame.getBoundingClientRect().height),
  }, null, 1);
})()
