import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { withBase } from '../lib/url';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const entries = (await getCollection('aktuelles')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
  return rss({
    title: 'Aktuelles – Frauenarztpraxis Dorothee Kalina',
    description:
      'Neuigkeiten, Praxisurlaub und Vertretungen der Frauenarztpraxis Dorothee Kalina in Leverkusen.',
    site: context.site ?? 'https://praxis-kalina.de',
    items: entries.map((e) => ({
      title: e.data.title,
      pubDate: e.data.date,
      description: ((e as { body?: string }).body ?? '').trim(),
      link: withBase('/aktuelles'),
    })),
  });
}
