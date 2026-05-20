# Changelog

Alle relevanten Änderungen an der Concrete CMS Marketing-Landingpage.

## 2026-05-20

### Added
- Neues Positioning als `CARE Pakete für deine Website`.
- Drei Care-Pakete eingeführt: `Static Care`, `CMS Care` und `Growth Care`.
- Neue CMS-Einfachheits-Section mit großem Produktbild.
- Lokale Fonts eingebunden:
  - `arame_regular.woff2` für Headlines.
  - `roc_grotesk_regular.woff2` für Copy und UI-Texte.
- Neues Footer-Logo über `concrete.svg`.
- Footer-Link zu `https://www.concrete-designs.de/` mit `target="_blank"`.
- FAQ erweitert um:
  - WordPress-Vergleich.
  - Nutzung mit bestehenden Websites.
  - SEO-Unterschiede je Paket.
  - Kündigung und statischer Export.
  - langfristige Zusammenarbeit mit Concrete.

### Changed
- Hero-Headline auf neue Website-Projekte ausgerichtet:
  - `Deine neue Webseite bleibt schnell, sicher und erweiterbar.`
- Pricing von technischem Hosting auf Website-Care und CMS-Betreuung umgestellt.
- Preise aktualisiert:
  - Static Care: `69,90 € / Monat`
  - CMS Care: `99,90 € / Monat`
  - Growth Care: `124,90 € / Monat`
- Growth Care als empfohlenes Paket hervorgehoben.
- Growth Care um Mehrsprachigkeit, Video Hosting, höhere Besucherzahlen, Google Analytics Dashboard und API-Schnittstellen erweitert.
- Reaktionszeit im Growth Care Paket auf `Innerhalb von 24 Stunden` gesetzt.
- Value-Copy von `Änderbarkeit` auf `Flexibilität` umgestellt.
- SEO-Argumentation gestärkt:
  - Static Care mit Basis-SEO.
  - CMS Care mit erweiterten SEO-Feldern.
  - Growth Care mit Kampagnen-, Landingpage- und Analytics-Fokus.
- HTML-Metadaten auf deutsch und neue Positionierung aktualisiert.

### Removed
- Google-Font-Imports entfernt, da die Seite jetzt lokale Fonts verwendet.
- Alte technische Paketnamen und Hosting-lastige Texte ersetzt.

### Validation
- `npm run lint`
- `npm run build`
- `git diff --check`
- Mobile/Desktop-Screenshots während der visuellen Prüfung genutzt.

## Initial

### Added
- Vite + React + TypeScript Landingpage.
- Hero mit Canvas-Hintergrund.
- Pricing-Section.
- FAQ-Accordion.
- CTA-Bereich.
- Footer.
