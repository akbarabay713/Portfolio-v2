export interface Study {
  id: string;
  title: string;
  note: string;
  technique: string;
}

/** Numbered UI micro-experiments. */
export const studies: Study[] = [
  { id: "S-001", title: "Split Text Rise", note: "Characters lift from a clipped baseline.", technique: "GSAP" },
  { id: "S-002", title: "Smoke Field", note: "Drifting light blobs blurred into fog.", technique: "Canvas" },
  { id: "S-003", title: "Velocity Skew", note: "Elements skew with scroll speed, then settle.", technique: "GSAP" },
  { id: "S-004", title: "Ring Cursor", note: "A trailing ring eased behind the pointer.", technique: "JavaScript" },
  { id: "S-005", title: "Time Palette", note: "Color shifts with the local hour.", technique: "CSS" },
  { id: "S-006", title: "Ghost Numerals", note: "Oversized section indices behind content.", technique: "Type" },
  { id: "S-007", title: "Marquee Drag", note: "A loop that speeds up with scroll velocity.", technique: "GSAP" },
  { id: "S-008", title: "Magnetic Pull", note: "Buttons lean toward the cursor.", technique: "GSAP" },
  { id: "S-009", title: "Pinned Filmstrip", note: "Panels scrub sideways while pinned.", technique: "GSAP" },
  { id: "S-010", title: "Line Draw", note: "Dividers extend from a single origin.", technique: "GSAP" },
  { id: "S-011", title: "Count Ledger", note: "Numbers tally up as they enter view.", technique: "GSAP" },
  { id: "S-012", title: "Curtain Intro", note: "A name reveal that lifts on first load.", technique: "GSAP" },
  { id: "S-013", title: "Hover Preview", note: "A thumbnail trails the cursor over a list.", technique: "GSAP" },
  { id: "S-014", title: "Grain Overlay", note: "Static noise laid over flat color.", technique: "SVG" },
  { id: "S-015", title: "Serif Accent", note: "Italic seams stitched into a sans layout.", technique: "Type" },
  { id: "S-016", title: "Corner Frame", note: "Brackets that frame the whole viewport.", technique: "CSS" },
  { id: "S-017", title: "Scroll Progress", note: "A thin rail tied to page position.", technique: "JavaScript" },
  { id: "S-018", title: "Mask Wipe", note: "Text uncovered by a moving clip path.", technique: "CSS" },
  { id: "S-019", title: "Parallax Drift", note: "Layers move at different scroll rates.", technique: "GSAP" },
  { id: "S-020", title: "Live Clock", note: "A monospace time that never stops.", technique: "JavaScript" },
  { id: "S-021", title: "Kinetic Type", note: "Letters that breathe on a slow sine.", technique: "GSAP" },
  { id: "S-022", title: "Elastic Halo", note: "A soft ring that overshoots and rests.", technique: "JavaScript" },
  { id: "S-023", title: "Noise Flow", note: "Particles advected through a curl field.", technique: "WebGL" },
  { id: "S-024", title: "Sticky Header", note: "Labels that hold while sections pass.", technique: "CSS" },
  { id: "S-025", title: "ASCII Rain", note: "Matrix drops seeded by the heading.", technique: "Canvas" },
  { id: "S-026", title: "Weighted Dock", note: "Icons that swell near the cursor.", technique: "JavaScript" },
  { id: "S-027", title: "Liquid Edge", note: "A border that flows like metal.", technique: "SVG" },
  { id: "S-028", title: "Stagger Grid", note: "Cells that cascade into place.", technique: "GSAP" },
];
