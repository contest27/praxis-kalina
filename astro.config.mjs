// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

/**
 * Deploy-Strategie (siehe quality_reports/plans):
 *  - Prototyp: GitHub-Pages Project-Page  →  site = https://<user>.github.io , base = /praxis-kalina
 *  - Produktiv (später, mit Freigabe der Ärztin): Custom-Domain praxis-kalina.de , base = '/'
 *
 * Beides über Umgebungsvariablen steuerbar, damit kein Code-Umbau nötig ist:
 *   SITE_URL   z. B. https://deinname.github.io   (oder https://praxis-kalina.de)
 *   BASE_PATH  z. B. /praxis-kalina               (oder /)
 */
// `||` statt `??`: fängt auch leere CI-Variablen ab und fällt auf die Defaults zurück.
// Default = GitHub-Pages-Project-Page von contest27; per SITE_URL/BASE_PATH überschreibbar
// (z. B. später für die Custom-Domain praxis-kalina.de).
const SITE = process.env.SITE_URL || 'https://contest27.github.io';
const BASE = process.env.BASE_PATH || '/praxis-kalina';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: {
    // saubere URLs: /kontakt/index.html  →  /kontakt
    format: 'directory',
  },
  integrations: [
    sitemap(),
    mdx(),
    // Lucide-Icons werden bei Bedarf aus @iconify-json/lucide inline eingebunden
    // (nur tatsächlich genutzte Icons landen im Build).
    icon(),
  ],
});
