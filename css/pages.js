// ============================================================
// WIKI KONFIGURATION — zentrale Steuerdatei
// Neue Seite hinzufügen = neuen Eintrag hier ergänzen.
// Alles andere (Startseite, Sidebar, Suche) aktualisiert sich automatisch.
// ============================================================

const WIKI_CONFIG = {

  title: "WFW Wiki",
  subtitle: "IHK Wirtschaftsfachwirt · Lernunterlagen",
  brand: "WFW",
  footer: "IHK Wirtschaftsfachwirt · Nur für internen Gebrauch",

  modules: [
    { id: "rewe", label: "Rechnungswesen", icon: "🧮", color: "#B42318" },
  ],

  pages: [

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
    {
      id: "rewe_ls02",
      module: "rewe",
      title: "LS02 · Grundlagen Finanzbuchhaltung",
      file: "pages/rewe_ls02.html",
      status: "fertig",
      updated: "28.06.2026",
      keywords: ["finanzbuchhaltung", "fibu", "grundbuch", "hauptbuch", "nebenbuch", "jahresabschluss", "bilanz", "guv", "anhang", "bilanzansatz", "bilanzbewertung", "going concern", "niederstwertprinzip", "höchstwertprinzip", "anschaffungskosten", "abschreibung", "afa", "linear", "degressiv", "leistungsabschreibung", "gwg", "geringwertige wirtschaftsgüter", "sammelposten", "fifo", "lifo", "hifo", "bewertungsvereinfachung", "skonto", "rückstellung", "verbindlichkeit", "periodenfremder aufwand", "übergangsjahr", "debitoren", "kreditoren", "festwert", "gruppenbewertung", "durchschnittsbewertung"]
    },

    {
      id: "rewe_ls03",
      module: "rewe",
      title: "LS03 · Grundlagen KLR",
      file: "pages/rewe_ls03.html",
      status: "fertig",
      updated: "28.06.2026",
      keywords: ["klr", "kosten- und leistungsrechnung", "selbstkosten", "deckungsbeitrag", "wirtschaftlichkeit", "angebotspreis", "einzelkosten", "gemeinkosten", "fixkosten", "variable kosten", "fixkostendegression", "bab", "proportional", "degressiv", "progressiv", "neutraler aufwand", "zusatzkosten", "anderskosten", "grundkosten", "zweckaufwand", "kalkulatorischer unternehmerlohn", "kalkulatorische abschreibung", "wiederbeschaffungswert", "absatzleistung", "lagerleistung", "innerbetriebliche leistung", "bestandserhöhung", "kostenartenrechnung", "kostenstellenrechnung", "kostenträgerrechnung"]
    },

    {
      id: "rewe_ls04",
      module: "rewe",
      title: "LS04 · Kostenartenrechnung",
      file: "pages/rewe_ls04.html",
      status: "fertig",
      updated: "28.06.2026",
      keywords: ["kostenartenrechnung", "kostengliederung", "einzelkosten", "gemeinkosten", "fixkosten", "variable kosten", "fixkostendegression", "proportionale kosten", "degressive kosten", "progressive kosten", "sprungfixe kosten", "intervall-fixe kosten", "mittelwertverfahren", "gewogener mittelwert", "gleitender mittelwert", "arithmetischer mittelwert", "lagerkarteikarte", "istkosten", "normalkosten", "plankosten", "istkostenrechnung", "normalkostenrechnung", "plankostenrechnung", "soll-ist-vergleich", "abweichungsanalyse", "kapazitätsgrenze", "stückkosten", "bab", "betriebsabrechnungsbogen"]
    },

    {
      id: "rewe_ls05",
      module: "rewe",
      title: "LS05 · Kostenstellenrechnung & BAB",
      file: "pages/rewe_ls05.html",
      status: "fertig",
      updated: "28.06.2026",
      keywords: ["kostenstellenrechnung", "kostenstelle", "bab", "betriebsabrechnungsbogen", "hauptkostenstelle", "hilfskostenstelle", "primärkostenverteilung", "sekundärkostenverteilung", "ilv", "innerbetriebliche leistungsverrechnung", "anbauverfahren", "stufenleiterverfahren", "gleichungsverfahren", "zuschlagssatz", "mgk", "fgk", "vwgk", "vtgk", "materialgemeinkosten", "fertigungsgemeinkosten", "verwaltungsgemeinkosten", "vertriebsgemeinkosten", "fertigungsmaterial", "fertigungslöhne", "herstellkosten", "selbstkosten", "kalkulation", "zuschlagskalkulation", "verursachungsprinzip", "verteilungsschlüssel", "einproduktbetrieb", "mehrproduktbetrieb"]
    },

    {
      id: "rewe_ls06",
      module: "rewe",
      title: "LS06 · Kostenträgerrechnung & Kalkulation",
      file: "pages/rewe_ls06.html",
      status: "fertig",
      updated: "28.06.2026",
      keywords: ["kostenträger", "kostenträgerstückrechnung", "kostenträgerzeitrechnung", "kalkulation", "zuschlagskalkulation", "differenzierende zuschlagskalkulation", "divisionskalkulation", "äquivalenzziffernkalkulation", "selbstkosten", "herstellkosten", "materialkosten", "fertigungskosten", "barverkaufspreis", "bvp", "nettoverkaufspreis", "nvp", "zielverkaufspreis", "zvp", "sek", "sondereinzelkosten", "sek fertigung", "sek vertrieb", "vorwärtskalkulation", "rückwärtskalkulation", "differenzkalkulation", "nachkalkulation", "vorkalkulation", "restprozent", "restprozentmethode", "skonto", "provision", "kundenrabatt", "preisuntergrenze", "kpug", "lpug", "kurzfristige preisuntergrenze", "langfristige preisuntergrenze", "variable kosten", "deckungsbeitrag", "maschinenstundensatz", "mss", "maschinenabhängige kosten", "kalkulation abschreibung", "kalkulation zinsen", "maschinenlaufzeit", "handelskalkulation", "einstandspreis", "listenpreis", "liefererrabatt", "liefererskonto", "bezugskosten", "bareinkaufspreis", "zieleinkaufspreis", "handlungskostensatz", "hks", "handelsspanne", "kalkulationszuschlag", "kzs", "kalkulationsfaktor", "hk umsatz", "hk produktion", "bestandsveränderung"]
    },
  ]
};
