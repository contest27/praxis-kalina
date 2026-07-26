import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

/**
 * Content-Collections = Vertrag zwischen Website und CMS (Sveltia/Decap).
 * Body-Markdown ist der von der Ärztin editierbare Fließtext,
 * das Frontmatter liefert die strukturierten Felder.
 * (Praxis-Stammdaten liegen als praxisdaten.json direkt daneben und
 *  werden dort importiert — kein Collection-Overhead für einen Singleton.)
 */

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    icon: z.string().default('heart-pulse'), // lucide-Icon-Name
    featured: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    since: z.number().int().optional(),
    photo: z.string().optional(), // Pfad unter /public; leer => Initialen-Avatar
    order: z.number().default(0),
  }),
});

const aktuelles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/aktuelles' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['Urlaub', 'Vertretung', 'Info']).default('Info'),
    date: z.coerce.date(),
    expires: z.coerce.date().optional(), // nach diesem Datum automatisch ausblenden
    pinned: z.boolean().default(false),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    order: z.number().default(0),
    category: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = { services, team, aktuelles, faq, pages };
