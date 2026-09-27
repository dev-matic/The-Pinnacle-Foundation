/**
 * Geometry for the Pinnacle arch: an equilateral pointed arch, the shape that
 * frames photography across the site. Two circular arcs spring from the sides
 * and meet at a single point: the "pinnacle".
 */

const STEPS = 18;
const SIN60 = Math.sin(Math.PI / 3);

type Box = { x: number; y: number; w: number; h: number };

/** Points (in the box's own units) tracing the arch outline, bottom-left clockwise to bottom-right. */
export function archPoints({ x, y, w, h }: Box, k = 1): Array<[number, number]> {
  const rise = Math.min(SIN60 * w, h * 0.92) * k;
  const scaleY = rise / (SIN60 * w || 1);
  const spring = y + rise;
  const pts: Array<[number, number]> = [[x, y + h], [x, spring]];
  for (let i = 1; i <= STEPS; i++) {
    const t = ((Math.PI / 3) * i) / STEPS;
    pts.push([x + w - w * Math.cos(t), spring - w * Math.sin(t) * scaleY]);
  }
  for (let i = STEPS - 1; i >= 0; i--) {
    const t = ((Math.PI / 3) * i) / STEPS;
    pts.push([x + w * Math.cos(t), spring - w * Math.sin(t) * scaleY]);
  }
  pts.push([x + w, y + h]);
  return pts;
}

/** clip-path polygon in percentages for an element with the given aspect ratio (width / height). */
export function archClipPct(aspect: number, k = 1) {
  const pts = archPoints({ x: 0, y: 0, w: 1, h: 1 / aspect }, k);
  return `polygon(${pts.map(([px, py]) => `${(px * 100).toFixed(3)}% ${(py * aspect * 100).toFixed(3)}%`).join(",")})`;
}

/** clip-path polygon in pixels, used where the arch morphs with scroll. */
export function archClipPx(box: Box, k = 1) {
  return `polygon(${archPoints(box, k)
    .map(([px, py]) => `${px.toFixed(1)}px ${py.toFixed(1)}px`)
    .join(",")})`;
}

/** SVG path for the arch outline (open at the bottom). */
export function archPath(box: Box, k = 1) {
  const pts = archPoints(box, k);
  return `M${pts.map(([px, py]) => `${px.toFixed(2)} ${py.toFixed(2)}`).join(" L")}`;
}
