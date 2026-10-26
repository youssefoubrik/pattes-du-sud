import type { PageMessages } from "../types";

const data: PageMessages = {
  adopt: {
    title: "Ein Tier adoptieren",
    intro:
      "Eine Adoption beginnt mit einem Gespräch. Tier und Familie sollen gut zueinander passen und Zeit zur Vorbereitung haben.",
    steps: [
      "Lerne ein Tier kennen und erzähle uns von deinem Zuhause und Alltag.",
      "Wir besprechen Pflege, Kosten und die nächsten Schritte.",
      "Wenn alles passt, vereinbaren wir eine sichere Übergabe und bleiben in Kontakt.",
    ],
    localTitle: "Mirleft und Marokko",
    internationalTitle: "Im Ausland",
    local:
      "In Marokko kannst du ein Treffen in Mirleft mit uns vereinbaren. Bitte komm nur nach Absprache vorbei.",
    international:
      "Du lebst im Ausland? Sag uns, wo. Reisevorschriften, Zeit und Transport hängen vom Ziel und Tier ab. Wir klären zuerst gemeinsam, was möglich ist.",
    contact: "Adoption anfragen",
  },
  volunteer: {
    title: "In Mirleft mithelfen",
    intro:
      "Schon etwas Zeit und praktische Hilfe können Hunden und Katzen auf der Straße viel bedeuten.",
    ways: [
      "Regelmäßiges Futter, sauberes Wasser und ruhige Zuwendung fördern das Wohlbefinden von Hunden und Katzen auf der Straße. Nach Absprache kannst du beim Füttern und bei der täglichen Versorgung helfen. Das Team schlägt eine passende Aufgabe vor, zum Beispiel Futter vorzubereiten oder Wassernäpfe aufzufüllen.",
      "Rechtzeitige tierärztliche Versorgung hilft kranken oder verletzten Hunden und Katzen, die nötige Behandlung zu bekommen. Du kannst dabei mit Fahrten, Material oder einem geplanten Tierarztbesuch unterstützen. Das Team stimmt die Aufgabe vorher mit dir ab und erklärt, welche praktische Hilfe gebraucht wird.",
      "Wenn mehr Menschen die Geschichte eines Hundes oder einer Katze kennen, können sie leichter Unterstützung anbieten oder über eine Adoption nachdenken. Du kannst klare Informationen über die Bedürfnisse und den Charakter des jeweiligen Tieres teilen. So erfahren Interessierte auch, wie sie sich einbringen können.",
    ],
    wayTitles: [
      "Füttern und tägliche Versorgung",
      "Fahrten, Material und Tierarztbesuche",
      "Geschichten teilen",
    ],
    actionImagesTitle: "Pflege im Alltag",
    actionImageCaptions: [
      "Einen Hund im Freien füttern",
      "Ein Kätzchen wird tierärztlich untersucht",
      "Einer Katze einen ruhigen Moment schenken",
    ],
    actionImageAlts: [
      "Eine Hand bietet einem Hund Futter an",
      "Eine Tierärztin untersucht ein weißes Kätzchen",
      "Eine Person streichelt sanft eine getigerte Katze",
    ],
    visitTitle: "Vor deinem Besuch",
    visit:
      "Die Aufgaben richten sich nach dem Bedarf der Hunde und Katzen und danach, was das Team an diesem Tag organisieren kann.",
    visitSteps: [
      "Melde dich vor deinem Besuch beim Team.",
      "Vereinbart gemeinsam eine passende Zeit und eine sinnvolle Aufgabe.",
    ],
    arrangeVisit: "Besuch zum Helfen vereinbaren",
  },
  contact: {
    title: "Kontakt",
    intro:
      "Fragen zu unseren Schützlingen, einem Besuch oder einer Spende? Kontaktiere das Team.",
    whatsapp: "Schreib uns auf WhatsApp",
    whatsappText: "Ich möchte Pattes du Sud helfen.",
    whatsappOpens: "WhatsApp öffnen",
    email: "Schreib uns eine E-Mail",
    emailOpens: "E-Mail senden",
    unavailable:
      "Die Kontaktdaten werden vorbereitet. Bitte schau bald wieder vorbei.",
    responseTime: "Wir antworten normalerweise innerhalb von",
    responseTimeUnit: "Stunden.",
    hoursStart: "Wir haben geöffnet von",
    hoursBetween: "bis",
    openingTime: "Wir öffnen um",
    closingTime: "Wir schließen um",
  },
  donate: {
    title: "Hilf mit deiner Spende",
    intro:
      "Deine Unterstützung hilft bei Futter, Tierarztkosten, Impfungen, Kastrationen, Medikamenten und bei Bedarf einem sicheren Ort.",
    impactExamplesTitle: "Das kann deine Spende möglich machen",
    impactExamples: [
      { amount: "5 €", impact: "Futter und sauberes Wasser" },
      { amount: "15 €", impact: "Medikamente und Impfungen" },
      { amount: "30 €", impact: "Tierärztliche Versorgung" },
    ],
    amount: "Den Betrag wählst du im nächsten Schritt.",
    frequency: "Spendenrhythmus",
    securePayment: "Sicher spenden",
    onceDescription:
      "Eine einmalige Spende hilft bei dem, was gerade gebraucht wird: Futter, Medikamente und tierärztliche Versorgung.",
    monthlyDescription:
      "Monatliche Spenden helfen uns, Futter, Behandlungen und die laufende Versorgung zu planen.",
    once: "Einmalig",
    monthly: "Monatlich",
    monthlyBadge: "Gut für laufende Versorgung",
    onceCta: "Einmalig spenden",
    monthlyCta: "Monatlich spenden",
    transfer: "Lieber per Banküberweisung spenden?",
    transferNote:
      "Du kannst bei deiner Bank auch eine regelmäßige Überweisung einrichten. Gib „Spende“ als Verwendungszweck an.",
    bankName: "Bank",
    iban: "IBAN",
    rib: "RIB",
    swift: "SWIFT / BIC",
    unavailable: "Die Daten für Online-Spenden werden vorbereitet.",
    copy: "Kopieren",
    copied: "Kopiert",
  },
  thanks: {
    title: "Danke für deine Hilfe",
    intro:
      "Deine Unterstützung hilft Tieren in Mirleft. Die Zahlung wird vom Zahlungsanbieter oder deiner Bank bestätigt.",
    share: "Unsere Arbeit teilen",
    home: "Zur Startseite",
  },
  mirleft: {
    title: "Vielleicht hast du unsere Tiere getroffen",
    intro:
      "Mirlefts Straßenhunde und -katzen gehören zu diesem Ort. Hilf uns, ihnen Futter, medizinische Versorgung und eine bessere Zukunft zu geben.",
    donate: "Spenden",
    animals: "Tiere kennenlernen",
    contact: "Kontakt",
  },
  privacy: {
    title: "Datenschutz",
    intro:
      "Wir erheben nur Daten, die für die Website und die Beantwortung deiner Nachricht nötig sind.",
    data: "Wenn du uns schreibst, nutzen wir deine Kontaktdaten und Nachricht für die Antwort. Wir verkaufen sie nicht. Besuche und Klicks zählen wir ohne Namen oder Tracking-Cookies.",
    payments:
      "Zahlungen erfolgen beim Zahlungsanbieter oder deiner Bank. Diese Website speichert keine Kartendaten.",
    contact: "Bei Fragen zu deinen Daten nutze bitte die Kontaktseite.",
  },
  animal: {
    story: "Meine Geschichte",
    facts: "Über mich",
    age: "Alter",
    sex: "Geschlecht",
    female: "Weiblich",
    male: "Männlich",
    vaccinated: "Geimpft",
    sterilized: "Kastriert",
    vaccinatedYes: "Geimpft",
    vaccinatedNo: "Impfung steht noch aus",
    sterilizedYes: "Kastriert",
    sterilizedNo: "Kastration steht noch aus",
    adopt: "Adoption anfragen",
    help: "Spenden",
    share: "Teilen",
    shareFallback: "Link kopiert!",
    back: "Alle Begleiter",
  },
};

export { data };
