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

---

## Dateistruktur
```
wfw-wiki1/
  index.html              ← Startseite (Kachel-Grid, auto-generiert via engine.js)
  build-index.js          ← Node.js-Skript für Volltextsuche-Index
  build-index.bat         ← Doppelklick-Version für Windows
  search-index.json       ← generierter Volltextindex (nach build-index.bat)
  UEBERGABE.md            ← diese Datei
  css/
    style.css             ← gesamtes CSS-Design (inkl. Sidebar-Toggle, Tiles)
    engine.js             ← baut Sidebar, Kacheln, Modul-Seiten, Logo, Toggle
    pages.js              ← ZENTRALE KONFIGURATION
    tiles.css             ← Kachel-Grid CSS (wird in index.html eingebunden)
  pages/
    about.html            ← Über-Seite mit Live-Statistiken
    modul_[id].html       ← 11 Modul-Übersichtsseiten (auto-generiert)
    rewe_ls01.html … rewe_ls09.html
    finanz_ls01.html
    recht_ls01.html … recht_ls03.html
  images/
    bowo-logo.svg         ← Logo dunkel (für About-Seite)
    bowo-logo-light.svg   ← Logo hell (wird per engine.js in Topbar eingefügt)
    [weitere Grafiken]    ← Screenshots aus PDFs, werden per <img> eingebettet
```

---

## Workflow pro neues Skript
1. Boris lädt PDF oder HTML hoch
2. Claude generiert `pages/[modul]_lsXX.html`
3. Claude aktualisiert `css/pages.js` (neuer Eintrag)
4. Claude liefert NUR die geänderten Dateien als ZIP
5. Boris: ZIP entpacken → Dateien in Wiki-Ordner → `build-index.bat` → GitHub Desktop Commit+Push

**Kein build-index.bat nötig** wenn nur HTML-Dateien geändert wurden (keine neue Seite) — dann direkt committen.

## Workflow für Grafiken in Skripten
1. Boris exportiert Grafik aus PDF/PowerPoint als PNG/JPG
2. Datei in `images/` ablegen
3. Boris nennt: Dateiname + welche HTML-Seite + wo einfügen
4. Claude liefert nur die eine geänderte HTML-Datei (kein ZIP, kein build-index.bat)

---

## pages.js — Struktur (KRITISCH: exakt so, sonst bricht Sidebar/Startseite)

```javascript
const WIKI_CONFIG = {
  title: "WFW Wiki",
  subtitle: "IHK Wirtschaftsfachwirt · Lernunterlagen",
  brand: "WFW",
  footer: "IHK Wirtschaftsfachwirt · Nur für internen Gebrauch",

  modules: [
    { id: "basics",    label: "Basics Wirtschaftsrechnen",     icon: "🔢", color: "#6d4c9e", dates: "06.03.–02.04.2026", dozent: "Kreß & Steinhof" },
    { id: "methodik",  label: "Lern- und Arbeitsmethodik",     icon: "📋", color: "#2980b9", dates: "07.04.2026",         dozent: "Dorn" },
    { id: "vwlbwl",   label: "Volks- und Betriebswirtschaft", icon: "📊", color: "#16a085", dates: "08.04.–21.04.2026", dozent: "Steinhof" },
    { id: "rewe",      label: "Rechnungswesen",                 icon: "🧮", color: "#B42318", dates: "22.04.–08.05.2026", dozent: "Rank" },
    { id: "recht",     label: "Recht und Steuern",             icon: "⚖️", color: "#1d6a3a", dates: "11.05.–28.05.2026", dozent: "Rank" },
    { id: "uf",        label: "Unternehmensführung",           icon: "🎯", color: "#c0392b", dates: "29.05.–12.06.2026", dozent: "Dern" },
    { id: "bm",        label: "Betriebliches Management",      icon: "🧠", color: "#d35400", dates: "15.06.–26.06.2026", dozent: "Mazajka & Labonté" },
    { id: "finanz",    label: "Finanzmanagement",              icon: "💰", color: "#1a5276", dates: "29.06.–24.07.2026", dozent: "Steinhof" },
    { id: "marketing", label: "Marketing und Vertrieb",        icon: "📣", color: "#7d3c98", dates: "27.07.–07.08.2026", dozent: "Füßler" },
    { id: "fuehrung",  label: "Führung & Zusammenarbeit",      icon: "👥", color: "#1e6b52", dates: "10.08.–21.08.2026", dozent: "Ramm" },
    { id: "logistik",  label: "Logistik und Distribution",     icon: "🚚", color: "#7f6000", dates: "24.08.–04.09.2026", dozent: "Rank" },
  ],

  pages: [
    // module: null für Meta-Seiten (about)
    // module: "rewe" / "finanz" / "recht" etc. für Lernseiten
    {
      id: "about", module: null, title: "Über dieses Wiki",
      file: "pages/about.html", status: "fertig", updated: "29.06.2026",
      keywords: [...]
    },
    // ...weitere Einträge
  ]
};
```

---

## Fertige Skripte

### Rechnungswesen (rewe) — ABGESCHLOSSEN ✅
LS01 Grundlagen Rechnungswesen · LS02 Grundlagen Fibu · LS03 Grundlagen KLR
LS04 Kostenartenrechnung · LS05 Kostenstellenrechnung & BAB
LS06 Kostenträgerrechnung & Kalkulation · LS07 Voll- und Teilkostenrechnung
LS08 Auswertung betriebswirtschaftlicher Zahlen · LS09 Planungsrechnung

### Finanzmanagement (finanz) — in Arbeit
LS01 Investitionsrechnung ✅ (inkl. Grafik „Grafik Bilanz - Investition.png" in Kap. 1.1)

### Recht und Steuern (recht) — in Arbeit
LS01 Grundlagen des Rechts · LS02 Schuldrecht & AGB · LS03 Kaufvertrag & Vertragsarten

### Noch leer (Modul-Übersichtsseiten vorhanden, Skripte fehlen)
basics · methodik · vwlbwl · uf · bm · marketing · fuehrung · logistik

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
  <!-- Sidebar-Toggle und Logo werden von engine.js automatisch eingefügt -->
</div>

<div class="layout">
  <nav class="sidebar"></nav>
  <main class="main">
    <div class="breadcrumb">
      <a href="../index.html">Startseite</a> › Modulname › LSXX Titel
    </div>
    <div class="page-header">
      <div class="kicker">Modulname · LSXX</div>
      <h1>LSXX · Titel</h1>
      <div class="meta">
        <span>Untertitel</span>
        <span>Stand: TT.MM.JJJJ</span>
        <span><span class="badge ok">Fertig</span></span>
      </div>
    </div>

    <!-- Inhalt -->

    <div class="related-topics">
      <h3>Verwandte Themen</h3>
      <ul>
        <li><a href="[modul]_lsXX.html">LSXX · Titel</a> – Beschreibung</li>
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
.def-box          ← Definition (grüner linker Rand)
.pruef-box        ← Prüfungsrelevant/Merksatz (gelb, mit ✏️-Label)
.notice.info      ← Hinweis/Rechenbeispiel (blau)
.notice.ok        ← Merksatz positiv (grün)
.notice.warn      ← Warnung/Transferaufgabe (orange)
.notice.danger    ← Prüfungsfalle (rot, mit ⛔)
.two-col          ← Zweispaltiges Grid
.content-card     ← Karte innerhalb two-col oder standalone
.related-topics   ← Verwandte Themen am Seitenende
.badge.ok         ← Grünes "Fertig"-Badge
```

**WICHTIG:** `.notice` hat `display: block` (nicht flex) — Text bleibt immer untereinander.

---

## Tabellen — Layoutregeln (aus Fehlern gelernt)
- Max. 5 Spalten — bei mehr zerfällt das Layout
- Header so kurz wie möglich (Abkürzungen bevorzugen)
- Viel Text pro Zelle → lieber `two-col` mit `content-card`
- Text nach Tabelle NIEMALS in derselben `.notice`-Box — neue Box aufmachen
- Rechenbeispiele mit mehreren Schritten → je Schritt eigene Box
- Leere Zellen bei Ergebniszeilen → `colspan` + grauer Hinweistext

---

## Navigation & Features
- **Startseite:** 12 Kacheln (11 Module + About), 4-spaltig, Fortschrittsbalken
- **Modul-Übersichtsseite:** `pages/modul_[id].html` — Skript-Liste mit Datum/Dozent
- **Sidebar:** einklappbar per `☰` Button (engine.js), Zustand in localStorage
  - Startseite: standardmäßig eingeklappt
  - Unterseiten: standardmäßig ausgeklappt
- **Logo:** `bowo-logo-light.svg` wird per engine.js dynamisch rechts in Topbar eingefügt
- **About-Kachel:** 12. Kachel auf Startseite → `pages/about.html`
- **Volltext-Suche:** Lunr.js, nach build-index.bat
- **Zuletzt besucht:** localStorage, 5 Einträge, in Sidebar

---

## Lieferformat
- Nur geänderte/neue Dateien als ZIP
- `pages/neueseite.html` + `css/pages.js` bei neuen Skripten
- Nur einzelne HTML-Datei bei Grafik-Einbettungen (kein ZIP, kein build-index.bat)
- `css/engine.js` oder `css/style.css` NUR wenn Features geändert werden

---

## Bekannte technische Details
- `engine.js` fügt Logo und Toggle-Button automatisch ein — NICHT manuell in HTML
- `build-index.bat` nach jeder neuen Seite ausführen (Node.js erforderlich)
- `.notice { display: block }` — verhindert Flex-Layout-Fehler bei Merksätzen
- GitHub Pages URL: `https://bowo-76.github.io/wfw-wiki1/`
- index.html muss `<link rel="stylesheet" href="css/tiles.css">` enthalten

---

## Geplante Erweiterungen
- **Werkzeugkästen** (4 PPTX, noch nicht fertig):
  - WK I–IV + Gesamtübersicht
  - Einbindung als PDF per `<iframe>` → neues Sidebar-Modul `🧰 Werkzeugkasten`
  - Warten bis alle 4 fertig, dann in einem Rutsch

---

## Fiverr-Kontext
Das Wiki dient als Portfolio-Demo für Freelance-Leistungen:
Prozessdokumentation · SOPs · interne Wiki-Systeme für KMUs
Verkaufsargument: kein Lock-in, keine Lizenzkosten, läuft lokal im Intranet oder auf eigenem Server.
