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
  search-index.json        ← generierter Volltextindex (nach build-index.bat)
  UEBERGABE.md            ← diese Datei
  css/
    style.css             ← gesamtes CSS-Design (Sidebar-Toggle, Tiles, Notizzettel, Formelglossar)
    engine.js             ← baut Sidebar, Kacheln, Modul-Seiten, Logo, Toggle, Notizzettel, Formelglossar
    pages.js              ← ZENTRALE KONFIGURATION (Module + alle Seiten)
    tiles.css             ← Kachel-Grid CSS (wird in index.html eingebunden)
    formelzeichen.json    ← NEU: zentrales Formelzeichen-Glossar (siehe unten)
  pages/
    about.html
    modul_[id].html        ← 11 Modul-Übersichtsseiten (auto-generiert)
    rewe_ls01.html … rewe_ls09.html
    finanz_ls01.html
    recht_ls01.html … recht_ls08.html
    bm_ls01.html, bm_ls01e.html, bm_ls02.html … bm_ls04.html
    uf_ls01.html, uf_ls02.html
  images/
    bowo-logo.svg, bowo-logo-light.svg, [weitere Grafiken]
```

---

## Workflow pro neues Skript
1. Boris lädt PDF, PPTX oder HTML hoch (auch ohne Begleittext — Modul/Nummerierung wird aus dem Dokument erkannt bzw. kurz nachgefragt)
2. Claude generiert `pages/[modul]_lsXX.html`
3. Claude aktualisiert `css/pages.js` (neuer Eintrag) **automatisch und ungefragt** — das ist jetzt Standard-Workflow, nicht mehr optional
4. Claude liefert NUR die geänderten/neuen Dateien (kein ZIP mehr nötig im aktuellen Workflow — einzelne Dateien per `present_files`)
5. Boris: Dateien in Wiki-Ordner kopieren → `build-index.bat` (nur bei neuen Seiten) → GitHub Desktop Commit+Push

**Kein build-index.bat nötig**, wenn nur bestehende HTML-Dateien/`engine.js`/`style.css`/`formelzeichen.json` geändert wurden (keine neue Seite) — dann direkt committen.

## Workflow für Grafiken in Skripten
1. Boris exportiert Grafik aus PDF/PowerPoint als PNG/JPG
2. Datei in `images/` ablegen
3. Boris nennt: Dateiname + welche HTML-Seite + wo einfügen
4. Claude liefert nur die eine geänderte HTML-Datei

**Neu:** Bei PDF-Quellen mit „📷 Grafik einfügen"-Platzhaltern (z.B. Dozentenskript-Verweise) übernimmt Claude diese vorerst als gelb hinterlegte Hinweisbox mit Bildbeschreibung + Quellenseite (`.notice.warn`), bis die echte Grafik nachgeliefert wird.

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
    // module: "rewe" / "finanz" / "recht" / "bm" / "uf" etc. für Lernseiten
    {
      id: "about", module: null, title: "Über dieses Wiki",
      file: "pages/about.html", status: "fertig", updated: "29.06.2026",
      keywords: [...]
    },
    // ...weitere Einträge, siehe aktuelle pages.js für vollständige Liste
  ]
};
```

⚠️ **OFFENER KLÄRUNGSPUNKT:** Im `modules`-Array steht beim Modul `bm` (Betriebliches Management) noch `dozent: "Mazajka & Labonté"` — alle bisher gelieferten bm-Skripte (LS01–LS04) zeigen jedoch durchgängig **Michael Dern** als Dozent (Quelle: hochgeladene PPTX-Dateien). Noch nicht final geklärt, ob das Dozenten-Feld im Modul-Array angepasst werden soll oder ob es aus historischen Gründen so bleiben muss (ggf. galt der alte Dozent für andere/frühere bm-Skripte außerhalb dieses Wikis). **Vor dem nächsten bm-Skript klären.**

---

## Fertige Skripte (Stand dieser Session)

### Rechnungswesen (rewe) — ABGESCHLOSSEN ✅
LS01 Grundlagen Rechnungswesen · LS02 Grundlagen Fibu · LS03 Grundlagen KLR
LS04 Kostenartenrechnung · LS05 Kostenstellenrechnung & BAB
LS06 Kostenträgerrechnung & Kalkulation · LS07 Voll- und Teilkostenrechnung
LS08 Auswertung betriebswirtschaftlicher Zahlen · LS09 Planungsrechnung

### Finanzmanagement (finanz) — in Arbeit
LS01 Investitionsrechnung ✅

### Recht und Steuern (recht) — ABGESCHLOSSEN ✅ (Baustein Recht: LS01–LS03; Baustein Steuern: LS04–LS08, fortlaufend nummeriert im selben Modul)
LS01 Grundlagen des Rechts · LS02 Schuldrecht & AGB · LS03 Kaufvertrag & Vertragsarten
LS04 Körperschaftsteuer · LS05 Gewerbesteuer · LS06 Kapitalertragsteuer und Abgeltungsteuer
LS07 Umsatzsteuer · LS08 Weitere Steuerarten und AO

### Betriebliches Management (bm) — in Arbeit, Dozent Michael Dern
LS01 Strategische & operative Planungsgrundlagen ✅
LS01-E Gegenstromverfahren & Zielsystem im Gleichgewicht (Ergänzung zu LS01) ✅
LS02 Betriebliche Planungsprozesse & Betriebsstatistik ✅
LS03 Wissensmanagement im Betrieb ✅
LS04 Informationstechnologie im Betrieb ✅

### Unternehmensführung (uf) — in Arbeit, Dozent Michael Dern
LS01 Betriebliche Planungsprozesse ✅ (mehrere "📷 Grafik einfügen"-Platzhalter offen, siehe Skript)
LS02 Aufbauorganisation ✅ (mehrere "📷 Grafik einfügen"-Platzhalter offen; Kapitel 7 "Varianten der personalwirtschaftlichen Organisation" im Quell-PDF noch nicht vom Dozenten behandelt — Platzhaltertext übernommen)

### Noch leer (Modul-Übersichtsseiten vorhanden, Skripte fehlen)
basics · methodik · vwlbwl · marketing · fuehrung · logistik

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
  <!-- Sidebar-Toggle, Formelglossar-Button, Notizzettel-Button und Logo werden von engine.js automatisch eingefügt -->
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
        <span>Untertitel / Dozent</span>
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
.pruef-box        ← Prüfungsrelevant/Merksatz (gelb, mit ✏️-Label) — alternativ zu .notice.danger
.notice.info      ← Hinweis/Rechenbeispiel/Praxisbeispiel/Musterlösung (blau)
.notice.ok        ← Merksatz positiv (grün)
.notice.warn      ← Zusatzwissen / Grafik-Platzhalter (orange)
.notice.danger    ← Prüfungsfalle (rot, mit ⛔)
.two-col          ← Zweispaltiges Grid
.content-card     ← Karte innerhalb two-col oder standalone
.related-topics   ← Verwandte Themen am Seitenende
.badge.ok         ← Grünes "Fertig"-Badge
```

**WICHTIG:** `.notice` hat `display: block` (nicht flex) — Text bleibt immer untereinander.

**Box-Mapping bei PDF/PPTX-Quellen mit eigenem Label-System** (z.B. „⬣ DEFINITION", „⚠ PRÜFUNGSFALLE", „■ PRAXISBEISPIEL", „✓ MERKSATZ", „✓ MUSTERLÖSUNG", „ℹ HINWEIS", „🧮 RECHENBEISPIEL", „+ ZUSATZWISSEN"):
- DEFINITION → `.def-box`
- PRÜFUNGSFALLE → `.notice.danger` mit „⛔ Prüfungsfalle"
- PRAXISBEISPIEL / MUSTERLÖSUNG / HINWEIS / RECHENBEISPIEL → `.notice.info`
- MERKSATZ → `.notice.ok`
- ZUSATZWISSEN / Grafik-Platzhalter → `.notice.warn`
- Anwendungsanker / Formulierungsbaustein (aus bm-Skripten) → `.def-box`

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

### NEU: Notizzettel (📝, nur auf Lernseiten)
- Icon in der Topbar (rechts, neben Logo), Panel slide-in von rechts
- Pro Skript eigener Eintrag in `localStorage` (Key: `wfw_notiz_<page.id>`), gerätegebunden — kein Sync zwischen Geräten (bewusst so, siehe unten)
- Auto-Save beim Tippen (debounced)
- Orangener Badge-Punkt am Icon, wenn Notiz Inhalt hat
- Panel-Offen/Zu-Status wird seitenübergreifend gemerkt (`localStorage`-Key `wfw_notiz_panel_open`)
- „🖨 Drucken & löschen"-Button: druckt NUR die Notiz (mit Kopfzeile: Skript-Titel + Datum), Rest der Seite wird beim Druck ausgeblendet (`body.notiz-printing`-Klasse steuert das per CSS). Nach dem Druck (`afterprint`-Event) wird die Notiz automatisch geleert — bewusstes „Wegwerf-Block"-Konzept für mobiles Lernen (Boris druckt unterwegs als PDF, neues leeres Blatt beim nächsten Mal)
- Implementiert in `engine.js` (`initNotizzettel()`) und `style.css` (Klassen `.notiz-toggle`, `.notiz-panel`, `.notiz-badge` etc.)

### NEU: Formelzeichen-Glossar (Σ, auf jeder Seite)
- Icon in der Topbar, links vom Notizzettel-Icon, global auf allen Seiten (nicht nur Lernseiten)
- Lädt Inhalte zur Laufzeit per `fetch()` aus `css/formelzeichen.json` (kein Script-Tag-Eintrag in den einzelnen HTML-Seiten nötig)
- Gruppiert nach Modul (z.B. „💰 Finanzmanagement", „🧮 Rechnungswesen", „⚖️ Recht und Steuern", „🧠 Betriebliches Management"), pro Gruppe auf-/zuklappbar (Pfeil ▾/▸, Zustand merkt sich während der Panel-Sitzung)
- Suchfeld filtert Symbol + Bedeutung live; bei aktiver Suche werden Treffergruppen automatisch aufgeklappt angezeigt
- **Pflege ausschließlich über `css/formelzeichen.json`** — kein Editieren im Browser. Struktur: Array von `{ modul: "<modul-id>", eintraege: [{ symbol, bedeutung }] }`
- Implementiert in `engine.js` (`initFormelzeichen()`) und `style.css` (Klassen `.formel-toggle`, `.formel-panel`, `.formel-group` etc.)
- Aktuell befüllt für Module: `finanz` (Investitionsrechnung-Symbole), `rewe` (Kalkulationskürzel), `recht` (Steuerkürzel), `bm` (Kennzahlen wie ROI, EKR, GKR, SMART, SWOT)

---

## Lieferformat
- Geänderte/neue Dateien werden einzeln per `present_files` geliefert (kein ZIP mehr im aktuellen Workflow)
- `pages/neueseite.html` + `css/pages.js` (immer beide zusammen, automatisch) bei neuen Skripten
- Nur einzelne HTML-Datei bei Grafik-Einbettungen oder kleinen Korrekturen (kein `pages.js`-Update nötig, wenn keine neue Seite)
- `css/engine.js`, `css/style.css` oder `css/formelzeichen.json` nur wenn Features/Glossar geändert werden

---

## Bekannte technische Details
- `engine.js` fügt Logo, Sidebar-Toggle, Notizzettel-Button und Formelglossar-Button automatisch ein — NICHT manuell in HTML
- Init-Reihenfolge in `engine.js` (DOMContentLoaded): `buildLogo()` → `initNotizzettel()` → `initFormelzeichen()` → `buildSidebar()` … (Reihenfolge ist wichtig für korrekte Button-Platzierung in der Topbar: Formelglossar-Button wird links vom bereits vorhandenen Notizzettel-Button eingefügt)
- `build-index.bat` nach jeder neuen Seite ausführen (Node.js erforderlich)
- `.notice { display: block }` — verhindert Flex-Layout-Fehler bei Merksätzen
- GitHub Pages URL: `https://bowo-76.github.io/wfw-wiki1/`
- index.html muss `<link rel="stylesheet" href="css/tiles.css">` enthalten
- **Niemals `localStorage`/`sessionStorage` in Claude-Artifacts verwenden** — hier im echten Wiki (kein Artifact-Kontext) ist das aber problemlos möglich und wird für Notizzettel, Panel-Status und Sidebar-Status aktiv genutzt

---

## Geplante Erweiterungen
- **Werkzeugkästen** (4 PPTX, noch nicht fertig):
  - WK I–IV + Gesamtübersicht
  - Einbindung als PDF per `<iframe>` → neues Sidebar-Modul `🧰 Werkzeugkasten`
  - Warten bis alle 4 fertig, dann in einem Rutsch
- Grafiken für die zahlreichen „📷 Grafik einfügen"-Platzhalter in `uf_ls01` und `uf_ls02` nachliefern (Eisberg-Modell, BCG-Matrix, Organigramm-Darstellungen, PDCA-Kreislauf etc.)
- Klärung Dozenten-Feld Modul `bm` in `pages.js` (siehe oben)
- Kapitel 7 in `uf_ls02` (Personalwirtschaftliche Organisation) ergänzen, sobald Dozent das Thema behandelt hat

---

## Fiverr-Kontext
Das Wiki dient als Portfolio-Demo für Freelance-Leistungen:
Prozessdokumentation · SOPs · interne Wiki-Systeme für KMUs
Verkaufsargument: kein Lock-in, keine Lizenzkosten, läuft lokal im Intranet oder auf eigenem Server.

Separates Demo-Projekt: **LogiBase Wiki** (fiktive LogiBase GmbH, dark blue/amber Branding, gleiche Architektur) — vollständig fertig, dient als zeigbares Fiverr-Portfolio-Stück unabhängig vom persönlichen WFW-Wiki.
