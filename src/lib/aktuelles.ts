import type { CollectionEntry } from 'astro:content';

type Aktuelles = CollectionEntry<'aktuelles'>;

/**
 * Aktive Meldungen: bereits gültig (date <= heute) und nicht abgelaufen
 * (kein expires oder expires >= heute). Sortierung: angeheftet zuerst, dann neueste.
 *
 * Hinweis: Der Build ist eingefroren → zeitbasiertes Ablaufen greift erst beim
 * nächsten Rebuild (täglicher Cron in der GitHub-Action). Zusätzlich blendet
 * AktuellesBanner abgelaufene Meldungen client-seitig aus (Gürtel + Hosenträger).
 */
export function activeAktuelles(entries: Aktuelles[], now: Date = new Date()): Aktuelles[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return entries
    .filter((e) => {
      const startOk = e.data.date <= now;
      const notExpired = !e.data.expires || e.data.expires >= today;
      return startOk && notExpired;
    })
    .sort((a, b) => {
      if (a.data.pinned !== b.data.pinned) return a.data.pinned ? -1 : 1;
      return b.data.date.getTime() - a.data.date.getTime();
    });
}

/** Icon + Label je Meldungstyp (Farbe nie allein — immer mit Label/Icon). */
export const AKTUELLES_META: Record<string, { icon: string; label: string; varName: string }> = {
  Urlaub: { icon: 'lucide:palmtree', label: 'Praxisurlaub', varName: '--type-urlaub' },
  Vertretung: { icon: 'lucide:users', label: 'Vertretung', varName: '--type-vertretung' },
  Info: { icon: 'lucide:info', label: 'Info', varName: '--type-info' },
};
