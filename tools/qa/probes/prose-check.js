(() => {
  const risky = /^(text-(white|black|blue|ink|body|muted|green|red|slate|gray|current)|text-(xs|sm|base|lg|xl)|bg-|border|underline$|no-underline|decoration|list-|font-|max-w-|m[tlrbxy]?-|p[tlrbxy]?-|\-m[tlrbxy]?\-|\-translate)/;
  const prose = document.querySelectorAll('.prose');
  let total = 0, flagged = 0;
  const samples = [];
  prose.forEach(p => {
    p.querySelectorAll('*').forEach(e => {
      total++;
      const cls = String(e.className || '').split(/\s+/).filter(Boolean);
      const hit = cls.filter(c => risky.test(c));
      if (hit.length) { flagged++; if (samples.length < 6) samples.push(e.tagName + ' :: ' + hit.join(' ')); }
    });
  });
  return JSON.stringify({ proseBlocks: prose.length, proseDescendants: total, withRiskyUtility: flagged, samples });
})()
