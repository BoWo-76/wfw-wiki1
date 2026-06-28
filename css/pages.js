// ============================================================
// WIKI KONFIGURATION — zentrale Steuerdatei
// Neue Seite hinzufügen = neuen Eintrag hier ergänzen.
// Alles andere (Startseite, Sidebar, Suche) aktualisiert sich automatisch.
// ============================================================

const WIKI_CONFIG = {

  // Wiki-Metadaten
  title: "WFW Wiki",
  subtitle: "IHK Wirtschaftsfachwirt · Lernunterlagen",
  brand: "WFW",
  footer: "IHK Wirtschaftsfachwirt · Nur für internen Gebrauch",

  // Module (Reihenfolge = Darstellungsreihenfolge)
  modules: [
    { id: "uf",   label: "Unternehmensführung",      icon: "🏢", color: "#1D6E52" },
    { id: "bm",   label: "Betriebliches Management", icon: "⚙️", color: "#2563EB" },
    { id: "fin",  label: "Finanzmanagement",          icon: "💰", color: "#D97706" },
    { id: "recht",label: "Recht",                     icon: "⚖️", color: "#7C3AED" },
    { id: "steu", label: "Steuern",                   icon: "🧾", color: "#B42318" },
    { id: "rewe", label: "Rechnungswesen",             icon: "🧮", color: "#B42318" },
    { id: "ref",  label: "Referenz",                  icon: "📚", color: "#0F513F" },
  ],

  // Seiten
  // status: "fertig" | "entwurf" | "geplant"
  pages: [

    // ── Unternehmensführung ──────────────────────────────────
    {
      id: "uf_ls01",
      module: "uf",
      title: "LS01 · Grundlagen Unternehmensführung",
      file: "pages/uf_ls01.html",
      status: "geplant",
      updated: "",
      keywords: ["unternehmensführung", "management", "führung", "grundlagen"]
    },
    {
      id: "uf_ls02",
      module: "uf",
      title: "LS02 · Strategische Planung",
      file: "pages/uf_ls02.html",
      status: "geplant",
      updated: "",
      keywords: ["strategie", "planung", "swot", "porter"]
    },

    // ── Betriebliches Management ─────────────────────────────
    {
      id: "bm_ls01",
      module: "bm",
      title: "LS01 · Einführung Betriebliches Management",
      file: "pages/bm_ls01.html",
      status: "geplant",
      updated: "",
      keywords: ["management", "betrieb", "einführung"]
    },
    {
      id: "bm_ls02",
      module: "bm",
      title: "LS02 · Projektmanagement",
      file: "pages/bm_ls02.html",
      status: "geplant",
      updated: "",
      keywords: ["projektmanagement", "projekt", "planung", "netzplan", "gantt"]
    },
    {
      id: "bm_ls03",
      module: "bm",
      title: "LS03 · Wissensmanagement",
      file: "pages/bm_ls03.html",
      status: "entwurf",
      updated: "28.06.2026",
      keywords: ["wissensmanagement", "seci", "nonaka", "implizites wissen", "explizites wissen", "wissensspirale"]
    },
    {
      id: "bm_ls04",
      module: "bm",
      title: "LS04 · IT in der Logistik",
      file: "pages/bm_ls04.html",
      status: "geplant",
      updated: "",
      keywords: ["it", "logistik", "erp", "wms", "barcode", "rfid"]
    },

    // ── Finanzmanagement ─────────────────────────────────────
    {
      id: "fin_ls01",
      module: "fin",
      title: "LS01 · Finanzplanung & Kapitalbedarf",
      file: "pages/fin_ls01.html",
      status: "geplant",
      updated: "",
      keywords: ["finanzplanung", "kapitalbedarf", "liquidität", "finanzierung"]
    },

    // ── Recht ────────────────────────────────────────────────
    {
      id: "recht_ls01",
      module: "recht",
      title: "LS01 · BGB Grundlagen",
      file: "pages/recht_ls01.html",
      status: "geplant",
      updated: "",
      keywords: ["bgb", "vertrag", "willenserklärung", "angebot", "annahme"]
    },

    // ── Steuern ──────────────────────────────────────────────
    {
      id: "steu_ls01",
      module: "steu",
      title: "LS01 · Grundlagen Steuerrecht",
      file: "pages/steu_ls01.html",
      status: "geplant",
      updated: "",
      keywords: ["steuer", "steuerrecht", "ao", "abgabenordnung"]
    },

    // ── Rechnungswesen ───────────────────────────────────────
    {
      id: "rewe_ls01",
      module: "rewe",
      title: "LS01 · Grundlagen Rechnungswesen",
      file: "pages/rewe_ls01.html",
      status: "fertig",
      updated: "28.06.2026",
      keywords: ["kaufmann", "istkaufmann", "formkaufmann", "kannkaufmann", "scheinkaufmann", "prokura", "durchgriffshaftung", "rechnungswesen", "rewe", "finanzbuchhaltung", "klr", "kosten", "leistung", "aufwand", "ertrag", "gob", "buchführungspflicht", "aufbewahrungsfristen", "wirtschaftlichkeit", "rentabilität", "produktivität", "imparitätsprinzip", "realisationsprinzip", "konstitutiv", "deklaratorisch", "eur", "hgb", "241a", "break-even"]
    },

    // ── Referenz ─────────────────────────────────────────────
    {
      id: "ref_tools",
      module: "ref",
      title: "Managementtools Übersicht",
      file: "pages/ref_tools.html",
      status: "geplant",
      updated: "",
      keywords: ["swot", "porter", "balanced scorecard", "bsc", "ishikawa", "fmea", "kano", "tools"]
    },
    {
      id: "ref_formeln",
      module: "ref",
      title: "Formeln & Kennzahlen",
      file: "pages/ref_formeln.html",
      status: "geplant",
      updated: "",
      keywords: ["formel", "kennzahl", "deckungsbeitrag", "roi", "eigenkapitalquote", "liquidität"]
    },
  ]
};
