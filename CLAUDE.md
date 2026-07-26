# CLAUDE.md — Praxis-Kalina-Website

**Identität:** Builder (reines Programmierprojekt, kein Teaching-Kontext).
**Was:** Statische Website der Frauenarztpraxis Dorothee Kalina (Leverkusen), Astro 7 → GitHub
Pages. Redesign/Prototyp der bestehenden WordPress-Seite `praxis-kalina.de`.

## Kanonische Quellen

- Inhalte: `src/content/` — Markdown + `praxis/praxisdaten.json` (**SSoT** für Sprechzeiten/Kontakt).
- Design: `src/styles/tokens.css` (Tokens) + `src/styles/global.css`.
- Plan: `quality_reports/plans/2026-07-26_praxis-kalina-redesign.md`.
- Session-Logs: `quality_reports/session_logs/`.

## Befehle

- `npm run dev` · `npm run build` · `npm run preview` · `npm run check`
- Node ≥ 20 (entwickelt mit 24). Unter Windows/PowerShell ggf. PATH aus der Registry neu laden.

## Nicht-verhandelbar (Guardrails)

- **Privacy-by-default:** keine Drittanbieter-Requests (self-hosted Fonts, keine Karten-iframes,
  keine Analytics/CDNs). Das Netzwerk-Panel muss frei von Fremd-Hosts bleiben → kein Cookie-Banner.
- **HWG:** keine Vorher-Nachher-Bilder, keine Heil-/Erfolgsversprechen, keine Patienten-Testimonials
  über Behandlungserfolge. Inhalte sachlich/informativ.
- **Base-Path-Disziplin:** ALLE internen Links/Assets über `withBase()` (`src/lib/url.ts`) bzw.
  `astro:assets`. `import.meta.env.BASE_URL` hat **keinen** Trailing-Slash — nie hart `/`-verwurzelte
  URLs schreiben.
- **Keine erfundenen medizinischen Fakten oder Praxis-Policies.** Reale Daten aus dem Content;
  Unsicheres von der Ärztin bestätigen lassen.
- **Marke:** Weinrot `#8A162A`, Rosé `#F7E6EC`. Notation/Farbrollen nicht ohne Grund ändern.

## Offen / Handoff

- GitHub-Nutzername → `SITE_URL`; Deploy via Actions (Pages-Source = GitHub Actions).
- Echtes Logo + Ärztinnen-Fotos (aktuell Emblem + Initialen-Avatare).
- Rechtsprüfung Impressum/Datenschutz vor Produktivgang.
- Phase 2: Sveltia/Decap-CMS + Cloudflare-Worker-OAuth (OAuth-App: Sebastian).
- Späterer Custom-Domain-Umzug `praxis-kalina.de` (mit der Ärztin abgestimmt).
