/**
 * Base-Path-sichere URL-Bildung.
 *
 * Prototyp läuft unter einem Unterpfad (z. B. /praxis-kalina/), produktiv unter '/'.
 * ALLE internen Links und Public-Assets MÜSSEN hierdurch laufen, sonst brechen sie
 * unter dem Unterpfad (Top-Pitfall laut Plan). Für optimierte Bilder immer
 * `astro:assets` verwenden — das respektiert den Base-Path automatisch.
 */
const BASE = import.meta.env.BASE_URL; // endet per Astro-Konvention auf '/'

export function withBase(path: string): string {
  const b = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}` || '/';
}
