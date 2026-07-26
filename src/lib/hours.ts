/**
 * Sprechzeiten-Helfer (serverseitig, für Tabelle & Schema.org).
 * Die „jetzt geöffnet?"-Logik läuft client-seitig in OpenNowBadge.astro
 * (zeitzonensicher via Intl / Europe-Berlin).
 */

export type Slot = { from: string; to: string };
export type DaySlots = { day: string; slots: Slot[] };

export const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as const;

export const DAY_LONG: Record<string, string> = {
  Mo: 'Montag',
  Di: 'Dienstag',
  Mi: 'Mittwoch',
  Do: 'Donnerstag',
  Fr: 'Freitag',
  Sa: 'Samstag',
  So: 'Sonntag',
};

/** Slots eines Tages lesbar, z. B. "08:00 – 12:00 & 14:00 – 18:00". */
export function formatSlots(slots: Slot[]): string {
  if (!slots || slots.length === 0) return 'geschlossen';
  return slots.map((s) => `${s.from} – ${s.to}`).join(' & ');
}

/** Vollständige Woche inkl. geschlossener Tage (Sa/So) für die Sprechzeiten-Tabelle. */
export function fullWeek(
  hours: DaySlots[]
): { day: string; long: string; label: string; closed: boolean }[] {
  return WEEKDAYS.map((day) => {
    const entry = hours.find((h) => h.day === day);
    const slots = entry?.slots ?? [];
    return { day, long: DAY_LONG[day], label: formatSlots(slots), closed: slots.length === 0 };
  });
}

/** Schema.org-Wochentag (Mo → Monday) für openingHoursSpecification. */
export const DAY_SCHEMA: Record<string, string> = {
  Mo: 'Monday',
  Di: 'Tuesday',
  Mi: 'Wednesday',
  Do: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  So: 'Sunday',
};
