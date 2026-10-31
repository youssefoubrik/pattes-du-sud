import type { PageMessages } from "../types";

const data: PageMessages = {
  adopt: {
    title: "Ein Tier adoptieren",
    intro:
      "Ein Tier aufzunehmen kann der Beginn einer besonderen Verbindung sein. Wir hören dir zu, beantworten deine Fragen und helfen dir herauszufinden, ob eine Adoption zu dir und dem Tier passt.",
    imageAlt: "Eine Person streichelt draußen sanft einen braunen Hund.",
    imageCaption: "Ein behutsamer erster Kontakt kann der Anfang von etwas Besonderem sein.",
    stepsTitle: "So läuft eine Adoption ab",
    stepsDescription:
      "Wir nehmen uns Zeit, einander kennenzulernen, alles Wichtige zur Adoption zu besprechen und gemeinsam die nächsten Schritte zu planen.",
    stepTitles: ["Ein erstes Kennenlernen", "Alles gemeinsam besprechen", "Ein behutsamer Übergang"],
    steps: [
      "Lerne einen Hund oder eine Katze kennen und erzähle uns von deinem Zuhause und Alltag.",
      "Wir besprechen Pflege, Kosten und die nächsten Schritte.",
      "Wenn alles passt, planen wir eine sichere Übergabe und bleiben in Kontakt.",
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
    mirleftSupport:
      "In Mirleft kann auch eine kleine Spende viel bewirken. Sie trägt zur täglichen Versorgung von Hunden und Katzen bei.",
    onceImpactTitle: "Eine einmalige Spende kann helfen bei:",
    onceImpacts: [
      "Aktuellen Bedürfnissen wie Futter, Medikamenten oder tierärztlicher Versorgung.",
      "Flexibler Unterstützung, wenn sich Bedarf und Prioritäten ändern.",
    ],
    monthlyImpactTitle: "Monatliche Spenden können uns helfen:",
    monthlyImpacts: [
      "Regelmäßiges Futter und Behandlungen verlässlicher einzuplanen.",
      "Die laufende Versorgung besser zu planen.",
    ],
    suggestedAmountsTitle: "Spendenbetrag wählen (EUR)",
    onceGiftSuggestions: ["10 €", "25 €", "50 €", "100 €"],
    monthlyGiftSuggestions: ["5 €", "10 €", "20 €", "50 €"],
    customAmountLabel: "Oder einen eigenen Betrag eingeben",
    amount: "Bitte gib deinen Betrag auf PayPal erneut ein, um deine Spende abzuschließen.",
    frequency: "Spendenrhythmus",
    securePayment: "Sicher spenden",
    once: "Einmalig",
    monthly: "Monatlich",
    monthlyBadge: "Gut für laufende Versorgung",
    onceCta: "Einmalig spenden",
    monthlyCta: "Monatlich spenden",
    paypalHandoffBefore: "Wenn du fortfährst, wickelt",
    paypalHandoffAfter: "deine Zahlung ab.",
    accountability:
      "Wir dokumentieren Einnahmen und Ausgaben, bewahren Rechnungen auf und dokumentieren die tierärztliche Versorgung.",
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
      "Hier erfährst du, welche Informationen bei der Nutzung dieser Website und bei einer Kontaktaufnahme verarbeitet werden.",
    analyticsTitle: "Website-Statistik",
    analytics:
      "Wir erfassen jeden Aufruf einer öffentlichen Seite, einen vom Hosting-Anbieter übermittelten Ländercode (falls verfügbar) und die Quellenangabe, wenn jemand die Mirleft-Seite über einen QR-Code aufruft. Diese Einträge speichern wir in der Website-Datenbank und verwenden sie zur Berechnung der Besuchszahlen. Wir bewahren sie höchstens 12 Monate auf und löschen sie danach. Die Statistik erfasst keine Button-Klicks oder IP-Adressen und verwendet keine Tracking-Cookies.",
    mapTitle: "Eingebettete Karte",
    map: "Die Google-Karte kann beim Laden technische Informationen wie deine IP-Adresse an Google senden.",
    contactMethodsTitle: "Wenn du uns kontaktierst",
    contactMethods:
      "Wenn du uns per E-Mail oder WhatsApp kontaktierst, verarbeiten diese Dienste deine Kontaktdaten und Nachricht. Wir nutzen sie, um dir zu antworten, und verkaufen sie nicht.",
    cookiesTitle: "Cookies",
    cookies:
      "Die Website verwendet ein Cookie, um deine Sprachauswahl zu merken, sowie ein separates Anmelde-Cookie für den Editor.",
    paymentsTitle: "Zahlungen",
    payments:
      "Wenn du einem PayPal-Link folgst, wickelt PayPal die Zahlung gemäß den eigenen Datenschutzbestimmungen ab. Banküberweisungen werden von deiner Bank verarbeitet. Diese Website erhebt oder speichert weder deine Karten- noch deine Bankkontodaten.",
    questionsTitle: "Fragen",
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
