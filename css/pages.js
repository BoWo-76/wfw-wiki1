// ============================================================
// WIKI KONFIGURATION — zentrale Steuerdatei
// ============================================================

const WIKI_CONFIG = {

  title: "WFW Wiki",
  subtitle: "IHK Wirtschaftsfachwirt · Lernunterlagen",
  brand: "WFW",
  footer: "IHK Wirtschaftsfachwirt · Nur für internen Gebrauch",

  modules: [
    { id: "rewe", label: "Rechnungswesen", icon: "🧮", color: "#B42318" },
    { id: "finanz", label: "Finanzmanagement", icon: "💰", color: "#1a5276" },
    { id: "recht", label: "Recht und Steuern", icon: "⚖️", color: "#1d6a3a" },
  ],

  pages: [

    // ── Rechnungswesen ───────────────────────────────────────
    {
      id: "rewe_ls01", module: "rewe", title: "LS01 · Grundlagen Rechnungswesen",
      file: "pages/rewe_ls01.html", status: "fertig", updated: "28.06.2026",
      keywords: ["kaufmann", "istkaufmann", "formkaufmann", "kannkaufmann", "scheinkaufmann", "prokura", "durchgriffshaftung", "rechnungswesen", "rewe", "finanzbuchhaltung", "klr", "kosten", "leistung", "aufwand", "ertrag", "gob", "buchführungspflicht", "aufbewahrungsfristen", "wirtschaftlichkeit", "rentabilität", "produktivität", "imparitätsprinzip", "realisationsprinzip", "konstitutiv", "deklaratorisch", "eur", "hgb", "241a", "break-even"]
    },
    {
      id: "rewe_ls02", module: "rewe", title: "LS02 · Grundlagen Finanzbuchhaltung",
      file: "pages/rewe_ls02.html", status: "fertig", updated: "28.06.2026",
      keywords: ["finanzbuchhaltung", "fibu", "grundbuch", "hauptbuch", "nebenbuch", "jahresabschluss", "bilanz", "guv", "anhang", "bilanzansatz", "bilanzbewertung", "going concern", "niederstwertprinzip", "höchstwertprinzip", "anschaffungskosten", "abschreibung", "afa", "linear", "degressiv", "leistungsabschreibung", "gwg", "geringwertige wirtschaftsgüter", "sammelposten", "fifo", "lifo", "hifo", "skonto", "rückstellung", "verbindlichkeit", "debitoren", "kreditoren", "festwert", "durchschnittsbewertung"]
    },
    {
      id: "rewe_ls03", module: "rewe", title: "LS03 · Grundlagen KLR",
      file: "pages/rewe_ls03.html", status: "fertig", updated: "28.06.2026",
      keywords: ["klr", "kosten- und leistungsrechnung", "selbstkosten", "deckungsbeitrag", "wirtschaftlichkeit", "einzelkosten", "gemeinkosten", "fixkosten", "variable kosten", "fixkostendegression", "bab", "neutraler aufwand", "zusatzkosten", "anderskosten", "grundkosten", "kalkulatorischer unternehmerlohn", "kalkulatorische abschreibung", "wiederbeschaffungswert", "kostenartenrechnung", "kostenstellenrechnung", "kostenträgerrechnung"]
    },
    {
      id: "rewe_ls04", module: "rewe", title: "LS04 · Kostenartenrechnung",
      file: "pages/rewe_ls04.html", status: "fertig", updated: "28.06.2026",
      keywords: ["kostenartenrechnung", "kostengliederung", "einzelkosten", "gemeinkosten", "fixkosten", "variable kosten", "fixkostendegression", "proportionale kosten", "degressive kosten", "progressive kosten", "sprungfixe kosten", "mittelwertverfahren", "gewogener mittelwert", "gleitender mittelwert", "istkosten", "normalkosten", "plankosten", "soll-ist-vergleich", "abweichungsanalyse", "stückkosten", "betriebsabrechnungsbogen"]
    },
    {
      id: "rewe_ls05", module: "rewe", title: "LS05 · Kostenstellenrechnung & BAB",
      file: "pages/rewe_ls05.html", status: "fertig", updated: "28.06.2026",
      keywords: ["kostenstellenrechnung", "kostenstelle", "bab", "betriebsabrechnungsbogen", "hauptkostenstelle", "hilfskostenstelle", "primärkostenverteilung", "sekundärkostenverteilung", "ilv", "innerbetriebliche leistungsverrechnung", "anbauverfahren", "stufenleiterverfahren", "gleichungsverfahren", "zuschlagssatz", "mgk", "fgk", "vwgk", "vtgk", "fertigungsmaterial", "fertigungslöhne", "herstellkosten", "selbstkosten", "zuschlagskalkulation", "verursachungsprinzip"]
    },
    {
      id: "rewe_ls06", module: "rewe", title: "LS06 · Kostenträgerrechnung & Kalkulation",
      file: "pages/rewe_ls06.html", status: "fertig", updated: "28.06.2026",
      keywords: ["kostenträger", "kalkulation", "zuschlagskalkulation", "differenzierende zuschlagskalkulation", "divisionskalkulation", "selbstkosten", "herstellkosten", "barverkaufspreis", "bvp", "nettoverkaufspreis", "nvp", "zielverkaufspreis", "zvp", "sek", "sondereinzelkosten", "vorwärtskalkulation", "rückwärtskalkulation", "differenzkalkulation", "nachkalkulation", "restprozent", "skonto", "provision", "kundenrabatt", "preisuntergrenze", "kpug", "lpug", "maschinenstundensatz", "mss", "handelskalkulation", "einstandspreis", "handlungskostensatz", "handelsspanne", "kalkulationszuschlag", "kalkulationsfaktor"]
    },
    {
      id: "rewe_ls07", module: "rewe", title: "LS07 · Voll- und Teilkostenrechnung",
      file: "pages/rewe_ls07.html", status: "fertig", updated: "29.06.2026",
      keywords: ["vollkostenrechnung", "teilkostenrechnung", "deckungsbeitragsrechnung", "deckungsbeitrag", "stückdeckungsbeitrag", "db", "proportionalisierungsfehler", "fixkostendegression", "leerkosten", "nutzkosten", "betriebsergebnis", "break-even", "break-even-point", "bep", "gewinnschwelle", "verlustzone", "gewinnzone", "zusatzauftrag", "engpass", "engpassoptimierung", "relativer deckungsbeitrag", "dbrel", "sortimentsbereinigung", "fixkostenremanenz", "kpug", "lpug", "produktionsprogramm"]
    },
    {
      id: "rewe_ls08", module: "rewe", title: "LS08 · Auswertung betriebswirtschaftlicher Zahlen",
      file: "pages/rewe_ls08.html", status: "fertig", updated: "29.06.2026",
      keywords: ["kennzahlen", "auswertung", "bilanzanalyse", "adressaten", "jahresabschluss", "grundzahlen", "verhältniszahlen", "gliederungszahl", "beziehungszahl", "indexzahl", "bilanzaufbereitung", "eigenkapitalquote", "verschuldungsgrad", "liquidität", "rentabilität", "eigenkapitalrentabilität", "ekr", "gesamtkapitalrentabilität", "gkr", "umsatzrentabilität", "ur", "fremdkapitalzinsen", "leverage-effekt", "hebelwirkung", "zeitvergleich", "betriebsvergleich", "berichtswesen", "standardbericht", "abweichungsbericht", "bedarfsbericht", "fristenkongruenz"]
    },
    {
      id: "rewe_ls09", module: "rewe", title: "LS09 · Planungsrechnung",
      file: "pages/rewe_ls09.html", status: "fertig", updated: "29.06.2026",
      keywords: ["planungsrechnung", "planung", "planungsebenen", "strategische planung", "taktische planung", "operative planung", "budgetplanung", "controlling", "ergebnisplanung", "absatzplanung", "produktionsplanung", "kostenplanung", "finanzplanung", "planergebnis", "planverabschiedung", "top-down", "bottom-up", "gegenstromverfahren", "retrograde planung", "progressive planung", "regelkreis", "soll-ist-vergleich", "abweichungsanalyse", "preisabweichung", "verbrauchsabweichung", "beschäftigungsabweichung", "leerkosten", "budgetierung", "budget", "budgetkontrolle"]
    },

    // ── Finanzmanagement ─────────────────────────────────────
    {
      id: "finanz_ls01", module: "finanz", title: "LS01 · Investitionsrechnung",
      file: "pages/finanz_ls01.html", status: "fertig", updated: "29.06.2026",
      keywords: ["investition", "finanzierung", "investitionsarten", "sachinvestition", "finanzinvestition", "ersatzinvestition", "erweiterungsinvestition", "rationalisierungsinvestition", "investitionsentscheidung", "statische verfahren", "dynamische verfahren", "kostenvergleichsrechnung", "gewinnvergleichsrechnung", "rentabilitätsrechnung", "amortisationsrechnung", "durchschnittsmethode", "kumulationsmethode", "kapitalwertmethode", "kapitalwert", "annuitätenmethode", "annuität", "kwf", "bwf", "interner zinsfuß", "regula falsi", "abzinsung", "aufzinsung", "wirtschaftliche nutzungsdauer", "kalkulationszinssatz", "wiederbeschaffungswert", "wbw", "amortisationsdauer"]
    },

    // ── Recht und Steuern ────────────────────────────────────
    {
      id: "recht_ls01", module: "recht", title: "LS01 · Grundlagen des Rechts",
      file: "pages/recht_ls01.html", status: "fertig", updated: "29.06.2026",
      keywords: ["rechtsordnung", "öffentliches recht", "privatrecht", "subordinationstheorie", "modifizierte subjektstheorie", "rechtssubjekte", "natürliche personen", "juristische personen", "rechtsobjekte", "sachen", "tiere", "rechtsfähigkeit", "geschäftsfähigkeit", "geschäftsunfähigkeit", "beschränkte geschäftsfähigkeit", "taschengeldparagraf", "§ 110 bgb", "§ 107 bgb", "§ 113 bgb", "deliktsfähigkeit", "rechtsgeschäfte", "einseitige rechtsgeschäfte", "mehrseitige rechtsgeschäfte", "willenserklärung", "konkludentes handeln", "stellvertretung", "vollmacht", "bote", "vertreter", "§ 164 bgb", "§ 179 bgb", "formfreiheit", "schriftform", "beglaubigung", "beurkundung", "§ 125 bgb", "nichtigkeit", "anfechtbarkeit", "schwebende unwirksamkeit", "irrtum", "erklärungsirrtum", "inhaltsirrtum", "eigenschaftsirrtum", "motivirrtum", "arglistige täuschung", "§ 119 bgb", "§ 123 bgb", "ex tunc", "einwilligung", "genehmigung"]
    },
    {
      id: "recht_ls02", module: "recht", title: "LS02 · Schuldrecht & AGB",
      file: "pages/recht_ls02.html", status: "fertig", updated: "29.06.2026",
      keywords: ["schuldrecht", "schuldverhältnis", "§ 241 bgb", "gläubiger", "schuldner", "vertragsfreiheit", "abschlussfreiheit", "inhaltsfreiheit", "formfreiheit", "aufhebungsfreiheit", "§ 134 bgb", "§ 138 bgb", "sittenwidrigkeit", "wucher", "hauptleistungspflichten", "nebenpflichten", "rücksichtnahmepflichten", "§ 433 bgb", "leistungsstörungen", "schuldnerverzug", "§ 286 bgb", "mahnung", "kalendertermin", "unmöglichkeit", "§ 275 bgb", "schlechtleistung", "annahmeverzug", "§ 293 bgb", "agb", "allgemeine geschäftsbedingungen", "§ 305 bgb", "§ 305b bgb", "individualabrede", "§ 305c bgb", "überraschende klauseln", "§ 307 bgb", "§ 306 bgb", "inhaltskontrolle", "b2b", "b2c", "treu und glauben", "§ 242 bgb", "generalklausel", "venire contra factum proprium", "gerichtsstand", "sachliche zuständigkeit", "örtliche zuständigkeit", "amtsgericht", "landgericht", "§ 23 gvg", "§ 12 zpo", "§ 17 zpo", "§ 38 zpo", "erfüllungsort", "§ 269 bgb", "holschuld", "schickschuld", "bringschuld", "§ 29 zpo"]
    },
    {
      id: "recht_ls03", module: "recht", title: "LS03 · Kaufvertrag & Vertragsarten",
      file: "pages/recht_ls03.html", status: "fertig", updated: "29.06.2026",
      keywords: ["kaufvertrag", "§ 433 bgb", "angebot", "annahme", "§ 145 bgb", "§ 147 bgb", "§ 150 bgb", "veränderte annahme", "essentialia negotii", "invitatio ad offerendum", "verbindliches angebot", "freibleibend", "unverbindliches angebot", "supermarkt", "vertragsschluss", "trennungsprinzip", "abstraktionsprinzip", "verpflichtungsgeschäft", "verfügungsgeschäft", "§ 929 bgb", "§ 925 bgb", "§ 873 bgb", "eigentum", "besitz", "§ 854 bgb", "§ 903 bgb", "mietvertrag", "§ 535 bgb", "dienstvertrag", "§ 611 bgb", "werkvertrag", "§ 631 bgb", "darlehen", "§ 488 bgb", "leasing", "dienst vs. werk", "tätigkeit vs. erfolg", "verbrauchsgüterkauf", "§ 474 bgb", "gewährleistung", "beweislastumkehr", "fernabsatzvertrag", "§ 312c bgb", "widerrufsrecht", "§ 355 bgb", "14 tage", "widerruf vs. anfechtung", "rückabwicklung"]
    },
  ]
};
