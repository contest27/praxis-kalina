# Frauenarztpraxis Dorothee Kalina — Website

Moderne, statische Website der Frauenarztpraxis Dorothee Kalina (Leverkusen) als Redesign der
bestehenden WordPress-Seite. Gebaut mit **Astro**, ausgelegt auf **GitHub Pages**, mit
**Privacy-by-default** (kein Cookie-Banner nötig) und optionaler Selbstpflege durch die Ärztin
via CMS (Phase 2).

> Prototyp/Vorschlag — die produktive Domain `praxis-kalina.de` bleibt bis zu einer abgestimmten
> Umstellung unberührt.

## Tech-Stack

- **Astro 7** (statisch, 0 JS by default; nur zwei winzige Inline-Skripte: Mobilmenü + „Jetzt geöffnet")
- Reines CSS mit Design-Tokens (`src/styles/tokens.css`)
- **Self-hosted Fonts** (`@fontsource-variable/quicksand`) — kein Google-Fonts-CDN
- `astro-icon` (Lucide, build-time inline), `@astrojs/sitemap`, `@astrojs/rss`
- `MedicalClinic`-JSON-LD, WCAG-2.2-AA-Ziel

## Lokale Entwicklung

Voraussetzung: **Node ≥ 20** (entwickelt mit Node 24).

```bash
npm install
npm run dev       # Dev-Server (http://localhost:4321/praxis-kalina/)
npm run build     # Produktionsbuild nach dist/
npm run preview   # Vorschau des Builds
npm run check     # Astro-/TypeScript-Typecheck
```

## Projektstruktur

```
src/
  content/            # ALLE Inhalte (von der Ärztin editierbar)
    services/         # Leistungen (Markdown)
    team/             # Ärztinnen-Profile
    aktuelles/        # Praxisnews (Urlaub/Vertretung/Info, mit optionalem Ablaufdatum)
    faq/              # Häufige Fragen
    pages/            # Seitentexte (Start, Über uns, Kontakt, Impressum, Datenschutz)
    praxis/praxisdaten.json   # Stammdaten + Sprechzeiten (Single Source of Truth)
  components/         # UI-Komponenten (.astro)
  layouts/BaseLayout.astro
  lib/                # url (Base-Path), hours, aktuelles
  styles/             # tokens.css, global.css
  pages/              # Routen
.github/workflows/deploy.yml   # GitHub-Pages-Deploy (+ täglicher Rebuild)
```

## Inhalte pflegen

Bis zum CMS (Phase 2) werden Inhalte direkt in `src/content/` als Markdown gepflegt. Die
Sprechzeiten und Kontaktdaten liegen zentral in `src/content/praxis/praxisdaten.json` und speisen
automatisch Kopf, Fuß, Sprechzeiten-Tabelle, „Jetzt geöffnet"-Anzeige und das SEO-Schema.

Eine neue „Aktuelles"-Meldung (z. B. Urlaub) = eine neue Datei in `src/content/aktuelles/` mit
`type: Urlaub|Vertretung|Info`, `date:` und optional `expires:` (danach blendet sie sich selbst aus).

## Deployment (GitHub Pages)

1. Repository auf GitHub anlegen (public), Code pushen.
2. **Settings → Pages → Source = GitHub Actions**.
3. **Settings → Secrets and variables → Actions → Variables** setzen:
   - `SITE_URL` = `https://<username>.github.io`
   - `BASE_PATH` = `/<repo-name>` (z. B. `/praxis-kalina`)
4. Push auf `main` löst den Workflow aus; die Seite erscheint unter
   `https://<username>.github.io/<repo-name>/`.

Ein täglicher Cron-Rebuild sorgt dafür, dass zeitbasierte „Aktuelles"-Meldungen ablaufen.

### Später: Custom-Domain `praxis-kalina.de`

`BASE_PATH=/`, `SITE_URL=https://praxis-kalina.de`, `public/CNAME` mit `praxis-kalina.de` anlegen,
DNS beim Registrar auf GitHub Pages zeigen und HTTPS erzwingen — **koordiniert mit der Ärztin**,
da die Domain aktuell die Live-WordPress-Seite bedient.

## Datenschutz & Recht (wichtig)

- **Bannerfrei by design:** keine Cookies, kein Tracking, self-hosted Fonts, keine
  Drittanbieter-Embeds. Die Online-Terminbuchung (arzt-direkt) und Kartendienste sind reine
  Weblinks (kein iframe).
- **Hosting-Hinweis:** GitHub Pages ist ein US-Host; das ist in der Datenschutzerklärung
  offengelegt. Für rein europäischen Datenfluss ggf. EU-Static-Host erwägen.
- **Vor Produktivgang:** Impressum & Datenschutzerklärung durch Fachanwalt/Ärztekammer prüfen
  lassen. Inhalte sind HWG-konform (sachlich, keine Heil-/Erfolgsversprechen, keine
  Vorher-Nachher-Bilder/Testimonials).

## Offene Punkte (Handoff)

- Echtes Logo (mit Wortmarke) + Fotos beider Ärztinnen (aktuell: Blüten-Emblem + Initialen-Avatare).
- Rechtsprüfung der Legal-Seiten.
- Optional: statisches Kartenbild für die Anfahrt (`public/img/anfahrt-map.png`), Geo-Koordinaten
  fürs Schema, Google Business Profile pflegen (NAP identisch zum Impressum).
- Phase 2: Sveltia/Decap-CMS + Cloudflare-Worker-OAuth (GitHub-OAuth-App erforderlich).
