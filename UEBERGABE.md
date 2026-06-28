# WFW Wiki — Übergabe-Notiz für neue Chats

## Kontext
Boris Wolff baut ein persönliches IHK-Lernwiki (Wirtschaftsfachwirt) als statisches HTML-System.
Kein CMS, keine Datenbank — läuft lokal und auf Netlify.

## Technischer Stand
- Wiki-Ordner: `wfw-wiki/` auf OneDrive (Boris' PC)
- Netlify: verbunden via GitHub, auto-deploy bei Push
- Aktueller Stand: v9 (Update-Pakete werden als ZIP geliefert)

## Dateistruktur
```
wfw-wiki/
  index.html           ← Startseite (auto-generiert via engine.js)
  build-index.js       ← Node.js-Skript für Volltextsuche-Index
  build-index.bat      ← Doppelklick-Version für Windows
  search-index.json    ← generierter Volltextindex (nach build-index.bat)
  css/
    style.css          ← gesamtes CSS-Design
    engine.js          ← baut Sidebar, Suche, Index automatisch
    pages.js           ← ZENTRALE KONFIGURATION (einzige Datei die pro Skript angepasst wird)
  pages/
    _TEMPLATE.html     ← Vorlage für neue Seiten
    rewe_ls01.html     ← fertige Seiten...
    rewe_ls02.html
    rewe_ls03.html
    rewe_ls04.html
    rewe_ls05.html
```

## Workflow pro neues Skript
1. Boris lädt PDF hoch
2. Claude generiert `pages/rewe_lsXX.html` (oder anderes Modul)
3. Claude aktualisiert `css/pages.js` (neuer Eintrag)
4. Claude liefert NUR die geänderten Dateien als ZIP (nicht das komplette Wiki)
5. Boris: ZIP entpacken → Dateien in Wiki-Ordner → build-index.bat → GitHub Desktop Commit+Push

## pages.js — Aufbau eines Eintrags
```javascript
{
  id: "rewe_ls05",
  module: "rewe",
  title: "LS05 · Kostenstellenrechnung & BAB",
  file: "pages/rewe_ls05.html",
  status: "fertig",        // "fertig" | "entwurf" | "geplant"
  updated: "28.06.2026",
  keywords: ["bab", "kostenstelle", ...]
}
```

## Module in pages.js (aktuell)
```javascript
modules: [
  { id: "rewe", label: "Rechnungswesen", icon: "🧮", color: "#B42318" },
  // weitere Module kommen dazu wenn erste Skripte hochgeladen werden
]
```

## HTML-Seitenstruktur (jede Seite)
```html
<!doctype html>
<html lang="de">
<head>
  <title>TITEL – WFW Wiki</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <div class="topbar">...</div>
  <div class="layout">
    <nav class="sidebar"></nav>  ← leer, wird von engine.js befüllt
    <main class="main">
      <div class="breadcrumb">...</div>
      <div class="page-header">...</div>
      <!-- Inhalt -->
      <div class="related-topics">...</div>  ← Verwandte Themen am Ende
    </main>
  </div>
  <footer class="page-footer">...</footer>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min.js"></script>
  <script src="../css/pages.js"></script>
  <script src="../css/engine.js"></script>
</body>
</html>
```

## CSS-Klassen für Inhaltsboxen
```
.def-box          ← Definition (grüner linker Rand)
.pruef-box        ← Prüfungsrelevant (gelb, mit ✏️-Label)
.notice.info      ← Hinweis (blau)
.notice.warn      ← Warnung (orange)
.notice.danger    ← Prüfungsfalle (rot, mit ⛔)
.notice.ok        ← Positiv (grün)
.two-col          ← Zweispaltiges Grid
.content-card     ← Karte innerhalb two-col
.related-topics   ← Verwandte Themen am Seitenende
```

## Features die bereits eingebaut sind
- Volltext-Suche via Lunr.js (search-index.json)
- Sprung zum Suchbegriff + gelbe Markierung
- Sidebar: Module auf-/einklappbar, aktive Seite markiert
- Startseite: Module auf-/einklappbar mit Fortschrittsbalken
- Zuletzt besucht (localStorage, 5 Einträge, unten in Sidebar)
- Druckbutton auf jeder Seite (@media print optimiert)
- Verwandte Themen am Seitenende

## Aktuell fertige Skripte (Modul Rechnungswesen)
- LS01: Grundlagen Rechnungswesen (Kaufmann, REWE-Bereiche, GoB, Wirtschaftlichkeit)
- LS02: Grundlagen Fibu (Buchführung, Bewertung, Abschreibung, GWG, FiFo/LiFo)
- LS03: Grundlagen KLR (Selbstkosten, DB, Einzel-/Gemeinkosten, Leistungen)
- LS04: Kostenartenrechnung (Kostengliederung, Mittelwerte, Ist/Normal/Plankosten)
- LS05: Kostenstellenrechnung & BAB (Kostenstellen, ILV, Zuschlagssätze)

## Lieferformat
Claude liefert immer:
- Nur geänderte/neue Dateien als ZIP (nicht das komplette Wiki)
- `pages/neueseite.html` (neue Wiki-Seite)
- `css/pages.js` (aktualisiert)
- Ggf. `search-index.json` wenn build-index.js lokal nicht ausgeführt wurde
- Ggf. `css/engine.js` oder `css/style.css` nur wenn Features geändert werden

## Neue Module erkennt Claude selbst aus dem PDF
Kein extra Hinweis nötig — Modul, Nummer und Thema stehen im Dokument.
