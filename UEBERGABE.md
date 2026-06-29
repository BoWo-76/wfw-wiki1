# WFW Wiki — Übergabe-Notiz für neue Chats

## Kontext
Boris Wolff baut ein persönliches IHK-Lernwiki (Wirtschaftsfachwirt) als statisches HTML-System.
Kein CMS, keine Datenbank — läuft lokal und auf GitHub Pages.

---

## Technischer Stand
- Wiki-Ordner: `wfw-wiki1/` auf OneDrive (Boris' PC)
- GitHub: Repository `BoWo-76/wfw-wiki1` (public)
- Hosting: GitHub Pages — `https://bowo-76.github.io/wfw-wiki1/`
- Netlify wurde aufgegeben (Build-Credits aufgebraucht)
- Aktueller Stand: v9+ (Update-Pakete werden als ZIP geliefert)

---

## Dateistruktur
```
wfw-wiki1/
  index.html              ← Startseite (auto-generiert via engine.js)
  build-index.js          ← Node.js-Skript für Volltextsuche-Index
  build-index.bat         ← Doppelklick-Version für Windows
  search-index.json       ← generierter Volltextindex (nach build-index.bat)
  UEBERGABE.md            ← diese Datei
  css/
    style.css             ← gesamtes CSS-Design
    engine.js             ← baut Sidebar, Suche, Index automatisch
    pages.js              ← ZENTRALE KONFIGURATION (einzige Datei die pro Skript angepasst wird)
  pages/
    _TEMPLATE.html        ← Vorlage für neue Seiten
    rewe_ls01.html … rewe_ls09.html
    finanz_ls01.html
```

---

## Workflow pro neues Skript
1. Boris lädt PDF oder HTML hoch
2. Claude generiert `pages/[modul]_lsXX.html`
3. Claude aktualisiert `css/pages.js` (neuer Eintrag)
4. Claude liefert NUR die geänderten Dateien als ZIP
5. Boris: ZIP entpacken → Dateien in Wiki-Ordner → `build-index.bat` → GitHub Desktop Commit+Push

**Kein build-index.bat nötig** wenn nur HTML-Dateien geändert wurden und keine neue Seite hinzukommt — dann reicht direktes Commit+Push.

---

## pages.js — Struktur (WICHTIG)
Die korrekte Konstantenbezeichnung ist `WIKI_CONFIG` (nicht `WFW_WIKI` o.ä.).
Pflichtfelder auf oberster Ebene: `title`, `subtitle`, `brand`, `footer`, `modules`, `pages`.

```javascript
const WIKI_CONFIG = {
  title: "WFW Wiki",
  subtitle: "IHK Wirtschaftsfachwirt · Lernunterlagen",
  brand: "WFW",
  footer: "IHK Wirtschaftsfachwirt · Nur für internen Gebrauch",
  modules: [
    { id: "rewe", label: "Rechnungswesen", icon: "🧮", color: "#B42318" },
    { id: "finanz", label: "Finanzmanagement", icon: "💰", color: "#1a5276" },
  ],
  pages: [
    {
      id: "rewe_ls01",
      module: "rewe",
      title: "LS01 · Grundlagen Rechnungswesen",
      file: "pages/rewe_ls01.html",
      status: "fertig",       // "fertig" | "entwurf" | "geplant"
      updated: "28.06.2026",
      keywords: ["kaufmann", "rewe", ...]
    },
    // ...weitere Einträge
  ]
};
```

---

## Module in pages.js (aktuell)
```javascript
{ id: "rewe",   label: "Rechnungswesen",   icon: "🧮", color: "#B42318" },
{ id: "finanz", label: "Finanzmanagement", icon: "💰", color: "#1a5276" },
```

Neue Module werden ergänzt wenn erste Skripte eines neuen Kursfachs hochgeladen werden.
Modulkürzel-Konvention: `rewe_lsXX`, `finanz_lsXX`, `[kürzel]_lsXX`

---

## Fertige Skripte

### Modul: Rechnungswesen (rewe) — ABGESCHLOSSEN
| ID | Titel |
|----|-------|
| rewe_ls01 | Grundlagen Rechnungswesen |
| rewe_ls02 | Grundlagen Finanzbuchhaltung |
| rewe_ls03 | Grundlagen KLR |
| rewe_ls04 | Kostenartenrechnung |
| rewe_ls05 | Kostenstellenrechnung & BAB |
| rewe_ls06 | Kostenträgerrechnung & Kalkulation |
| rewe_ls07 | Voll- und Teilkostenrechnung |
| rewe_ls08 | Auswertung betriebswirtschaftlicher Zahlen |
| rewe_ls09 | Planungsrechnung |

### Modul: Finanzmanagement (finanz) — in Arbeit
| ID | Titel |
|----|-------|
| finanz_ls01 | Investitionsrechnung |

---

## HTML-Seitenstruktur (EXAKT so — nicht abweichen!)
```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LSXX · Titel – WFW Wiki</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

<div class="topbar">
  <a class="brand" href="../index.html">WFW<span>Wiki</span></a>
  <div class="search-wrap">
    <input id="search-input" type="search" placeholder="Thema suchen …" autocomplete="off">
    <div id="search-results"></div>
  </div>
</div>

<div class="layout">
  <nav class="sidebar"></nav>

  <main class="main">
    <div class="breadcrumb">
      <a href="../index.html">Startseite</a> › Modulname › LSXX Seitentitel
    </div>
    <div class="page-header">
      <div class="kicker">Modulname · LSXX</div>
      <h1>LSXX · Titel</h1>
      <div class="meta">
        <span>Untertitel · Themen</span>
        <span>Stand: TT.MM.JJJJ</span>
        <span><span class="badge ok">Fertig</span></span>
      </div>
    </div>

    <!-- Inhalt -->

    <div class="related-topics">
      <h3>Verwandte Themen</h3>
      <ul>
        <li><a href="rewe_lsXX.html">LSXX · Titel</a> – kurze Beschreibung</li>
      </ul>
    </div>

  </main>
</div>

<footer class="page-footer">
  <div>WFW Wiki · IHK Wirtschaftsfachwirt</div>
  <div>MODUL LSXX · Stand: TT.MM.JJJJ</div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min.js"></script>
<script src="../css/pages.js"></script>
<script src="../css/engine.js"></script>
</body>
</html>
```

---

## CSS-Klassen für Inhaltsboxen
```
.def-box          ← Definition (blauer linker Rand)
.pruef-box        ← Prüfungsrelevant / Merksatz (gelb/orange)
.notice.info      ← Hinweis / Rechenbeispiel (blau)
.notice.ok        ← Merksatz positiv (grün)
.notice.warn      ← Warnung / Transferaufgabe (orange)
.notice.danger    ← Prüfungsfalle (rot, mit ⛔)
.two-col          ← Zweispaltiges Grid
.content-card     ← Karte innerhalb two-col
.related-topics   ← Verwandte Themen am Seitenende
.badge.ok         ← Grünes "Fertig"-Badge im page-header
```

---

## Tabellen — Layoutregeln (gelernt aus Fehlern)
- Maximal 5 Spalten in einer Tabelle — bei mehr zerfällt das Layout
- Spaltenheader so kurz wie möglich (Abkürzungen bevorzugen)
- Tabellen mit viel Text pro Zelle → stattdessen `two-col` mit `content-card` verwenden
- Text nach einer Tabelle NIEMALS innerhalb derselben `.notice`-Box — neue Box aufmachen
- Rechenbeispiele mit mehreren Schritten: je Schritt eine eigene Box, nicht alles in eine Tabelle quetschen
- Leere Zellen bei zusammengefassten Ergebniszeilen → `colspan` + grauer Hinweistext

---

## Lieferformat
Claude liefert immer:
- Nur geänderte/neue Dateien als ZIP (nicht das komplette Wiki)
- `pages/neueseite.html` (neue Wiki-Seite)
- `css/pages.js` (aktualisiert, vollständig)
- Ggf. `search-index.json` wenn build-index.bat lokal nicht ausgeführt wurde
- `css/engine.js` oder `css/style.css` NUR wenn Features geändert werden

---

## Eingabe-Formate
- **PDF**: ältere Skripte (REWE LS01–LS09 wurden alle als PDF geliefert)
- **HTML**: neuere Skripte werden direkt als HTML geliefert (ab Finanzmanagement)
- Bei HTML: Inhalt übernehmen, aber komplett in Wiki-Stil überführen (eigenes CSS, Topbar, Footer etc.)
- Grafiken/Diagramme aus PDFs: werden per Screenshot nachgeliefert und als `<img src="../images/dateiname.png">` eingebettet. Ordner `images/` im Wiki-Root.

---

## Geplante Erweiterungen
- **Werkzeugkästen** (4 PPTX-Dateien, noch nicht fertig):
  - WK I: Management- & Analysemethoden (23 Werkzeuge)
  - WK II: Strategische Analyse & Projektsteuerung
  - WK III: Entscheidungs- & Bewertungstechniken (13 Slides, als Muster vorhanden)
  - WK IV: (noch offen)
  - Gesamtübersicht: WK I–IV (4 Slides)
  - Einbindung geplant als PDF-Einbettung per `<iframe>` → neues Sidebar-Modul `🧰 Werkzeugkasten`
  - Warten bis alle 4 WK fertig sind, dann in einem Rutsch integrieren

---

## Bekannte technische Eigenheiten
- `engine.js` generiert den Drucken-Button automatisch — NICHT manuell in HTML einbauen
- `build-index.bat` muss nach jeder neuen Seite lokal ausgeführt werden (Node.js erforderlich)
- GitHub Pages URL: `https://bowo-76.github.io/wfw-wiki1/` (ersetzt frühere Netlify-URL)
- Bei GitHub Pages: Repository muss public sein (kostenlos, kein Build-Minuten-Limit)
