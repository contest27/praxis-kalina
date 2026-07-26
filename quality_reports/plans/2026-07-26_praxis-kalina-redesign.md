# Redesign praxis-kalina.de → moderne statische Praxis-Website (Astro + Decap-CMS auf GitHub Pages)

**Status:** Bereit zur Freigabe (Recherche- + Architektur-Agent eingearbeitet)
**Datum:** 2026-07-26
**Identität:** Builder (reines Programmierprojekt) · **Projektordner:** `C:\Users\P314966\Documents\Claude\Projects\Doro`

---

## Kontext (Warum)

Für eine befreundete Ärztin (Frauenarztpraxis Dorothee Kalina, Leverkusen) soll die bestehende Website **schöner** gemacht und um **neue Features** erweitert werden. Die aktuelle Seite läuft auf **WordPress 7.0.2 + Astra-Theme + Elementor + Popup Maker** — funktional, aber optisch generisch, Leistungen stecken in Popups, Wartung/Sicherheit an WordPress gebunden.

Ziel dieses Projekts (per Interview festgelegt):
- **Deploybarer Prototyp** auf **GitHub Pages** — echte Inhalte, live ansehbar, als Vorschlag für die Ärztin zum Absegnen; später 1:1 produktiv möglich.
- **Technik:** Astro (Static-Site-Generator) + **Sveltia/Decap-CMS**, damit die Ärztin „Aktuelles", Texte und Sprechzeiten **selbst** pflegen kann.
- **Design:** bestehende **Identität modernisieren** (Weinrot `#8A162A` + Logo bleiben, luftiger/hochwertiger).
- **Feature-Fokus:** Vertrauen & Patienteninfos · SEO & Barrierefreiheit · **konsistentes, sauberes Cookie-/Datenschutz-Handling**.

Der WordPress-Weg scheidet fürs Ziel aus: GitHub Pages ist statisches Hosting, WordPress läuft dort nicht.

---

## Audit der bestehenden Seite (Ist-Zustand)

**Tech:** WordPress 7.0.2, Astra 4.11.15, Elementor 3.33.2, Popup Maker 1.21.5, jQuery. Google-Fonts-CDN (Quicksand, Roboto, Roboto Slab) → **DSGVO-Risiko** (Google-Fonts-Urteil).

**Seiten:** `/` (Start) · `/ueber-uns/` · `/leistungen/` · `/kontakt/` · `/datenschutz/` · `/impressum/`. Footer: Datenschutz, Impressum.

**Design-Tokens (exakt gemessen):**
- Primär **`#8A162A`** (Weinrot) — dominant; Section-Akzent **`#F7E6EC`** (Rosé); Neutrals `#FFFFFF`, `#F9F9F9`, Dunkelgrau `#2B2B2B`.
- Fonts: Quicksand (Body 400/18px, H2/Nav 600), Roboto (H1/H3 600). Fließtext aktuell in Weinrot → im Redesign auf Dunkelgrau für Lesbarkeit.
- Assets: Logo nur als quadratische Bildmarke **ohne Text** (`cropped-Logo-Quadrat-o.-Text`), Favicons 32/180/192px; Foto Dr. Kalina vorhanden. (Hi-res-Logo/-Fotos von der Ärztin nachfordern.)

---

## Inhalts-Inventar (vollständig erfasst, wird 1:1 migriert)

**Praxis / Kontakt:** Frauenarztpraxis Dorothee Kalina · Dechant-Fein-Str. 9, 51375 Leverkusen · Tel. **0214 56081** · Fax **0214 56082** · **mail@praxis-kalina.de** · Online-Termine (extern): `https://app.arzt-direkt.de/praxis-kalina/booking`.

**Sprechzeiten:** Mo 8–12 & 14–18 · Di 8–12 & 14–18 · Mi 8–12 · Do 8–12 & 14–18 · Fr 8–12.

**Team:** Dorothee Kalina (Inhaberin, Fachärztin f. Gynäkologie u. Geburtshilfe seit 2017; Studium Jena; Marienhospital Brühl, Krankenhaus Porz; ehem. Oberärztin Kreißsaal) · Dr. Maren Unterberg (Fachärztin, seit 2021; Studium Köln/Durban; Stationen Düren, Peterborough UK; ehem. Oberärztin Krankenhaus Porz).

**Leistungen (heute Popups → künftig echte Inhalte):** Vorsorge · Betreuung in der Schwangerschaft (inkl. geburtsvorbereitende Akupunktur) · Hormonberatung · Mädchensprechstunde. (Volltexte verbatim erfasst und via Live-Seite jederzeit rückholbar.)

**Impressum-Fakten:** Einzelpraxis; Berufsbezeichnung „Fachärztin für Gynäkologie und Geburtshilfe" (verliehen in Deutschland); Ärztekammer Nordrhein + KV Nordrhein (Tersteegenstr. 9, 40474 Düsseldorf); Berufsordnung Ärztekammer Nordrhein, Heilberufsgesetz NRW; keine USt-IdNr.

---

## Design-System (modernisierte Identität)

- **Farbrollen:** Weinrot `#8A162A` = Marke/Headings/CTAs; `#F7E6EC` (Rosé) = weiche Section-Flächen; Dunkelgrau `#2B2B2B` = Fließtext; Weiß/`#F9F9F9` = Grundflächen. Hover/Aktiv = dunkleres Weinrot. (Kontraste auf WCAG-AA prüfen.)
- **Typografie:** Quicksand als Display/Marken-Font (self-hosted), lesbarer Body-Sans (Kandidaten: Quicksand durchgehend vs. neutraler Humanist-Sans für Fließtext — Entscheidung in Umsetzung). `font-display: swap`, WOFF2, self-hosted (kein CDN).
- **Look:** mehr Weißraum, klare Sektionen, sanfte Rundungen, dezente Schatten, ruhige Scroll-/Hover-Effekte (mit `prefers-reduced-motion`), großzügige Hero-Fläche, kartenbasierte Leistungen statt Popups.

---

## Feature-Scope

**Baseline (Parität zur Altseite, verbessert — immer dabei):**
- Prominente **arzt-direkt-Terminbuchung** (CTA im Header + auf jeder Seite + Kontakt).
- Sprechzeiten, Kontaktdaten, Adresse, datenschutzfreundliche Anfahrt.
- Responsive, mobile-first; barrierearme Navigation.

**Fokus 1 — Vertrauen & Patienteninfos:**
- **„Aktuelles"-Banner/Bereich** (Praxisurlaub, Vertretung, geänderte Sprechzeiten) — CMS-editierbar durch die Ärztin.
- **FAQ** (Rezept, Überweisung, Notfall/Vertretung, Neupatientinnen).
- **Team-Sektion** mit Fotos & Werdegang.
- **Leistungen als eigene, verlinkbare Inhalte** statt Popups.

**Fokus 2 — SEO & Barrierefreiheit:**
- **Schema.org JSON-LD:** `MedicalClinic` als Haupt-Entity + `medicalSpecialty: Gynecologic` + verschachtelte `Physician`-Entities + `openingHoursSpecification` + `geo`/`address`/`telephone`.
- Local-SEO-Grundlagen, saubere Meta/OpenGraph, `sitemap.xml`, `robots.txt`; Google-Business-Profile-Pflege empfehlen (NAP identisch).
- **WCAG 2.2 AA** (semantisches HTML, Skip-Link, Fokus-States, Farbkontrast, Tastaturbedienung) — Praxis vermutl. BFSG-befreit, Ziel dennoch 2.2 AA.
- Top-Performance (Ziel ~100 Lighthouse; Astro liefert 0 JS by default).

**Fokus 3 — Cookie/Datenschutz konsistent (Privacy-by-default):**
- Ziel: **gar kein Cookie-Banner** nötig — self-hosted Fonts, keine Analytics-Tracker (optional cookielos wie Plausible/GoatCounter), keine Drittanbieter-Embeds mit Cookies.
- Karte: statisches Bild / OpenStreetMap-Link statt Google-Maps-iframe; Google-Bewertungen (falls gewünscht) als Klick-zum-Laden oder Link-out.
- Falls je ein Embed Zustimmung braucht: **genau ein** konsistenter Consent-Mechanismus (keine Flickenlösung).

---

## Ziel-Architektur (Astro 5 + Sveltia/Decap-CMS + GitHub Pages)

**Stack:** Astro 5 (Content Layer, **0 JS by default**) · **kein** UI-Framework — nur 2 winzige Inline-Script-Islands (Mobile-Menü, „Jetzt geöffnet") · Plain CSS mit Design-Tokens (CSS-Custom-Properties) · Fonts **self-hosted** via `@fontsource-variable/quicksand` (kein Google-CDN) · `astro-icon` (build-time SVG) · `@astrojs/sitemap` + `@astrojs/rss` (Aktuelles-Feed) · **Sveltia-CMS** (Decap-kompatibel, GitHub-freundlicher, bessere Editor-UX) mit Decap als Drop-in-Fallback.

**Projektstruktur (verkürzt):**
```
astro.config.mjs        # site/base — die eine load-bearing Stellschraube
src/
  content.config.ts     # alle Collection-Schemas (Zod) = Vertrag Seite↔CMS
  content/{services,team,aktuelles,faq,pages}/*.md  +  praxis/praxisdaten.json
  layouts/BaseLayout.astro          # <html lang=de>, <head>/SEO, Skip-Link, Landmarks
  components/  Header(sticky+Hamburger+CTA), Footer, Hero, ServiceCard, TeamCard,
               OpeningHours, OpenNowBadge(island), AktuellesBanner, AktuellesCard,
               FaqAccordion(<details>), ContactCTA(Link-out), Anfahrt(static map),
               Seo, StructuredData(JSON-LD)
  lib/hours.ts (Berlin-TZ open/closed) · lib/aktuelles.ts (Aktiv/Ablauf)
  styles/tokens.css + global.css
  pages/ index, ueber-uns, leistungen/{index,[slug]}, aktuelles, kontakt, datenschutz, impressum
.github/workflows/deploy.yml   # withastro/action + deploy-pages + täglicher Cron
public/ CNAME, favicon, robots.txt, img/(Logo, anfahrt-map.png) · admin/(Phase 2: Sveltia + config.yml)
```

**Content-Model:** Collections `services`, `team`, `aktuelles` (type Urlaub/Vertretung/Info + date + optional `expires`), `faq`, `pages` (Singletons: Start/Über-uns/Kontakt/Impressum/Datenschutz) und **`praxis`** = eine JSON-Datei als **Single Source of Truth** für Adresse, Kontakt, Buchungs-URL und Sprechzeiten → speist Öffnungszeiten-Tabelle, „Jetzt-geöffnet"-Badge und Schema.org gleichzeitig. Body-Markdown = CMS-editierbarer Text. (Sprechzeiten-Format als `{from,to}`-Objekte, damit Zod-Schema und CMS-List-Widget deckungsgleich sind.)

**Zwei kniffligere Stellen:**
- **„Jetzt geöffnet"** wird client-seitig via `Intl` mit `timeZone:'Europe/Berlin'` berechnet (DST-sicher — **niemals** fixer +01:00-Offset). Ohne JS bleibt die Sprechzeiten-Tabelle sichtbar (Progressive Enhancement). NRW-Feiertage kennt die Badge nicht → ein aktives `Urlaub`-Aktuelles kann „geschlossen" erzwingen.
- **Aktuelles-Ablauf auf statischer Seite:** Build ist eingefroren → Meldung liefe ohne Rebuild nicht ab. Lösung: **täglicher Cron-Rebuild** (GitHub Actions) **plus** client-seitiges Ausblenden abgelaufener Meldungen.

**CMS-Auth (Phase 2, die einzige echte Hürde):** GitHub Pages kann den OAuth-Handshake (Client-Secret) nicht ausführen → **Sveltia-CMS + gratis Cloudflare-Worker als OAuth-Relay**. **Sebastian legt selbst** eine GitHub-OAuth-App an (Client-ID/Secret) und deployt den Worker — betrifft Account/Secrets, daher seine Aufgabe (ich liefere Klick-für-Klick-Anleitung; das Secret sieht nur der Worker, nie ich). Lokales Testen via `local_backend` ganz ohne OAuth-App.

**Deploy & Domain-Strategie (bewusste Abweichung vom Agenten-Default):** Der Agent riet zu „Custom-Domain ab Tag 1" — hier **nicht** möglich, weil `praxis-kalina.de` die **produktive Live-Seite** der Ärztin ist (dürfen wir für einen Prototyp nicht kapern). Daher:
- **Prototyp:** Deploy auf **Project-Page** `https://<user>.github.io/praxis-kalina/` (`base:'/praxis-kalina'`). Base-Path-Disziplin: interne Links/Assets über `import.meta.env.BASE_URL` / `astro:assets`, keine hart `/`-verwurzelten URLs.
- **Später produktiv (nur mit Freigabe der Ärztin):** Umstellung auf `praxis-kalina.de` = `base:'/'` + committetes `public/CNAME` + koordinierter DNS-Cutover weg von WordPress. Einmaliger, abgestimmter Schritt, **nicht** Teil des Prototyps.

## Phasing & Umsetzungsreihenfolge

**Phase 1 — deploybare statische Seite (Inhalte im Repo, keine CMS-Abhängigkeit):**
1. Astro-5-Projekt scaffolden + Integrationen; Design-Tokens + globales CSS; self-hosted Quicksand.
2. `BaseLayout` + `Header`/`Footer` + barrierefreie Navigation.
3. Content-Collections definieren + **Inhalte migrieren** (Leistungen, Team, Praxisdaten/Sprechzeiten, Seiteninhalte, Impressum/Datenschutz — Impressum um Berufsbezeichnung + aekno.de-Link ergänzt).
4. Seiten bauen: Start (Hero, Aktuelles-Banner, Leistungs-Karten, Sprechzeiten + „Jetzt-geöffnet", arzt-direkt-CTA), Über-uns, Leistungen (+ Detailseiten), Kontakt (Anfahrt static map, Buchungs-Button), Aktuelles, Impressum, Datenschutz.
5. SEO/Schema (`MedicalClinic` JSON-LD, sitemap, meta/OG), A11y-Feinschliff, **Lighthouse**.
6. GitHub-Actions-Deploy + Live-Test auf der Project-Page.
→ Zero externe Abhängigkeiten/Credentials → **schnell live & abnehmbar**; Content-Model ist bereits final, nichts Wegwerf.

**Phase 2 — Sveltia/Decap-CMS + OAuth-Relay (rein additiv):** `public/admin/`, Cloudflare-Worker, Sebastian legt GitHub-OAuth-App an; Redaktions-Test. Falls OAuth/DNS stockt, bleibt Phase 1 **unberührt live**.

---

## Rechtliches & Barrierefreiheit (DE-spezifisch) — recherchiert

> Recherchierte Rechtsinfo, **keine Rechtsberatung** — vor Produktivgang kurze Prüfung durch Fachanwalt Medizin-/IT-Recht sinnvoll.

**Impressum (Arzt):** zusätzlich zu §5 DDG Pflicht: Berufsbezeichnung + verleihender Staat („Fachärztin für Gynäkologie und Geburtshilfe, verliehen in Deutschland"), zuständige **Ärztekammer Nordrhein** + **KV Nordrhein**, benannte berufsrechtliche Regelungen (**Heilberufsgesetz NRW**, **Berufsordnung ÄkNo**) **mit Link auf aekno.de**, Aufsichtsbehörde. → Vorhandene Fakten übernehmen, Berufsbezeichnung + aekno.de-Link sicherstellen.

**Datenschutz / bannerfrei:** Cookie-Banner ist nur nötig, sobald nicht-essentielle Cookies/Drittanbieter-Requests geladen werden. Bannerfrei durch: **self-hosted Fonts** (Google-Fonts-Urteil LG München I, 20.01.2022), **kein** Google-Maps-iframe (statisches Bild/OSM-Link), keine Analytics/Social-Widgets/Fremd-CDNs. Gesundheitsdaten = **Art. 9 DSGVO** (höchstes Schutzniveau). Datenschutzerklärung muss abdecken: Verantwortliche, Server-Logs (Art. 6(1)f), Kontakt/E-Mail, arzt-direkt-Buchung, Auftragsverarbeiter (GitHub, arzt-direkt/Zollsoft) **mit AVV**, Betroffenenrechte, Beschwerde bei **LDI NRW**.
**Hosting-Hinweis (Entscheidungspunkt):** GitHub Pages = **US-Host** (Microsoft/Fastly) → in der Datenschutzerklärung offenlegen (Art. 6(1)f + SCC/DPF). Für rein EU-Datenfluss ggf. EU-Static-Host erwägen (Netlify EU / Cloudflare / dt. Hoster) — relevant für die produktive Version, für den Prototyp OK (offenlegen).

**HWG:** **keine** Vorher-Nachher-Bilder (BGH 31.07.2025 auch minimalinvasiv/Avatare), **keine** Heilversprechen/Erfolgsgarantien, **keine** Patienten-Testimonials über Behandlungserfolge (Bußgeld bis 50.000 €). Erlaubt: sachliche Leistungsbeschreibung, echte Facharzt-/Zusatzbezeichnungen, allgemeine Bewertungen (Freundlichkeit/Erreichbarkeit) wenn authentisch & ohne Behandlungsergebnis. → Inhalte durchweg sachlich/informativ; **Bewertungs-Einbindung im Prototyp weglassen**.

**BFSG (seit 28.06.2025):** Reine Info-Website = nicht im Anwendungsbereich; Online-Terminbuchung wäre „Dienstleistung im el. Geschäftsverkehr", ABER **Kleinstunternehmen-Ausnahme** (§3 Abs.3: <10 MA UND ≤2 Mio. €) greift → Praxis **wahrscheinlich rechtlich befreit**, auch mit Buchung. Kommentarlage gespalten → **Ziel dennoch WCAG 2.2 AA** (überschneidet sich mit SEO/UX, im Neubau günstig). Zusatz: arzt-direkt-Buchung liegt bei Zollsoft → deren eigene BFSG-Pflicht macht den externen Buchungsflow ohnehin voraussichtlich barrierefrei.

**arzt-direkt-Einbindung:** offiziell iframe ODER Deep-Link. Empfehlung: **Deep-Link-Button** zu `app.arzt-direkt.de/praxis-kalina/booking` (robust, responsive-sicher, DOM/Datenschutz sauber, kein Fremd-Frame). iframe nur falls On-Page-Buchung gewünscht (Responsive-Höhen-Caveat). AVV + Datenschutz-Nennung nötig.

**SEO/Schema:** `MedicalClinic` (Subtyp v. MedicalBusiness+LocalBusiness) als Haupt-Entity, `medicalSpecialty: Gynecologic`, verschachtelte `Physician`-Entities, `openingHoursSpecification`, `geo`, `address`, `telephone`, `availableService`. Google Business Profile pflegen (NAP identisch zum Impressum), Aktuelles via GBP-Posts spiegeln.

---

## Offene Punkte / von Sebastian benötigt

- **GitHub-Account/Repo:** GitHub-Nutzername + gewünschter Repo-Name (Vorschlag `praxis-kalina`), public (nötig für kostenloses Pages). Wird **erst zum Deploy** gebraucht (für `site:`/`base:` + Actions) — den **Phase-1-Bau starte ich sofort lokal**, unabhängig davon. Repo-Erstellung + Push-Auth (kein `gh`/kein git init bisher): entweder du legst das leere Repo an und ich pushe, oder ich gebe dir die Push-Befehle.
- **Phase 2:** GitHub-OAuth-App anlegen (Client-ID/Secret) für Decap/Sveltia-Login.
- **Assets:** hochauflösendes Logo (idealerweise mit Wortmarke) + Fotos beider Ärztinnen + ggf. Praxis-Innenaufnahmen.
- **Custom Domain:** jetzt github.io-Adresse; späterer Umzug von `praxis-kalina.de` = separater Schritt (mit Absprache der Ärztin).
- **Hosting-Entscheidung (produktiv):** GitHub Pages (US-Host, offenlegen) vs. EU-Static-Host (Netlify EU / Cloudflare / dt. Hoster) für rein europäischen Datenfluss — für Prototyp GitHub Pages OK.
- **Inhaltliche Freigabe:** finale Texte/Fakten von der Ärztin bestätigen lassen, bevor produktiv.

---

## Verifikation (wie wir „fertig" prüfen)

- `npm run build` fehlerfrei; lokale Vorschau (`astro preview`) im In-App-Browser gegen die Altseite gegenchecken (Inhaltsparität, alle Seiten erreichbar).
- **Lighthouse** (Performance/Accessibility/Best-Practices/SEO) — Ziel ≥ 95, Accessibility 100.
- Barrierefreiheit: Tastatur-Durchlauf, Fokus sichtbar, Kontraste (Weinrot/Rosé auf Weiß) mit Checker verifiziert.
- Datenschutz: Netzwerk-Panel zeigt **keine** Drittanbieter-Requests (Fonts/Karte lokal) → kein Banner nötig.
- Nach Deploy: Live-URL auf GitHub Pages öffnen, mobil/Desktop testen.
- Abschluss-Review über die passenden Builder-Qualitätsgates (kein Teaching-Agent).
