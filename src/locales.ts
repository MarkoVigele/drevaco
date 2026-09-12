import type { BadgeId, CategoryId, LeatherColorId, ProductId } from "./catalog";

export type Locale = "sk" | "en" | "de";

export const LOCALES: readonly Locale[] = ["sk", "en", "de"];

export type ProductCopy = {
  name: string;
  blurb: string;
  engravingHint: string;
  presets: readonly string[];
};

export type Messages = {
  meta: { title: string; description: string };
  skip: string;
  nav: { shop: string; items: string; offers: string };
  lang: { group: string; sk: string; en: string; de: string };
  cart: string;
  cartAria: string;
  cartAriaCount: string;
  promo: {
    region: string;
    engravingTitle: string;
    engravingBody: string;
    fourTitle: string;
    fourBody: string;
    pendantsTitle: string;
    pendantsBody: string;
  };
  hero: { title: string; body: string; imageAlt: string; toShop: string; offerCta: string };
  offersTitle: string;
  catalogTitle: string;
  filters: string;
  category: Record<CategoryId | "alle", string>;
  badge: Record<BadgeId, string>;
  products: Record<ProductId, ProductCopy>;
  options: {
    lederfarbe: { label: string; values: Record<LeatherColorId, string> };
  };
  close: string;
  engravingFree: string;
  engravingLabel: string;
  engravingPlaceholder: string;
  qtyLess: string;
  qtyMore: string;
  qty: string;
  addToCart: string;
  toastAdded: string;
  cartTitle: string;
  cartRule: string;
  cartEmpty: string;
  engravingShort: string;
  remove: string;
  subtotal: string;
  fourPlusOne: string;
  fourPlusOneFree: string;
  total: string;
  offerIncluded: string;
  untilFree: string;
  continueReserve: string;
  backToShop: string;
  checkout: string;
  checkoutEmpty: string;
  checkoutTitle: string;
  checkoutIntro: string;
  checkoutSummary: string;
  checkoutSummaryFree: string;
  fieldName: string;
  fieldEmail: string;
  fieldPhone: string;
  fieldNote: string;
  notePlaceholder: string;
  submitReserve: string;
  backToCart: string;
  noOrderTitle: string;
  noOrderBody: string;
  doneTitle: string;
  doneBody: string;
  doneSummary: string;
  doneDiscount: string;
  newSelection: string;
  footerLine1: string;
  footerLine2: string;
};

const de: Messages = {
  meta: {
    title: "DREVACO — Holzgravur",
    description:
      "DREVACO — personalisierte Holz- und Ledergravur. Schlüsselbretter, Kochlöffel, Bretter, Bierkrüge und Anhänger. Kostenlose Namensgravur. 4+1 gratis.",
  },
  skip: "Zum Inhalt",
  nav: { shop: "Shop", items: "Auswahl", offers: "Aktionen" },
  lang: { group: "Sprache wählen", sk: "Slowakisch", en: "Englisch", de: "Deutsch" },
  cart: "Korb",
  cartAria: "Warenkorb",
  cartAriaCount: "Warenkorb, {count} Stück",
  promo: {
    region: "Aktionen",
    engravingTitle: "Namensgravur",
    engravingBody: "Kostenlose Namensgravur auf alle Artikel — Spruch oder Name, so wie am Stand.",
    fourTitle: "4+1 gratis",
    fourBody: "Auch im Mix: ab fünf Stück ist jeder fünfte frei. Wir nehmen immer den günstigsten.",
    pendantsTitle: "Anhänger",
    pendantsBody: "Schlüsselanhänger 5 €, fünf Stück damit 20 € — dieselbe Rechenregel.",
  },
  hero: {
    title: "Holzgravur",
    body: "Personalisierte Stücke aus Holz und Leder — Name oder Spruch, so wie am Stand. Hier nur vormerken, ohne Zahlung.",
    imageAlt: "Marktstand mit gravierten Holzbrettern, Bierkrügen und Schlüsselanhängern",
    toShop: "Zur Auswahl",
    offerCta: "4+1 gratis",
  },
  offersTitle: "Aktionen",
  catalogTitle: "Unsere Artikel",
  filters: "Kategorien",
  category: {
    alle: "Alles",
    schluesselbrett: "Schlüsselbretter",
    kochloeffel: "Kochlöffel",
    holzbrettchen: "Bretter",
    bierkrug: "Bierkrüge",
    bierkrugbrett: "Krugbretter",
    anhaenger: "Anhänger",
  },
  badge: {
    eur10: "10 €",
    eur3: "3 €",
    eur5: "5 €",
    engravingIncl: "Gravur inkl.",
    fiveFor20: "5 / 20 €",
  },
  products: {
    "schluesselbrett-haus": {
      name: "Schlüsselbrett Hausform",
      blurb:
        "Hausförmiges Brett aus hellem Holz, zwei Haken, Spruch vom Stand oder euer eigener Text. Namensgravur ist im Preis.",
      engravingHint: "Spruch oder Familienname — z. B. Familie Maier",
      presets: [
        "Zuhause ist, wo dein Herz ist",
        "Zuhause ist, wo wir zusammen sind",
        "Zuhause ist da, wo Herzen ankommen",
      ],
    },
    kochloeffel: {
      name: "Kochlöffel / Pfannenwender",
      blurb: "Heller Holzwender vom Marktstand. Kurzer Spruch oder Name auf dem Blatt — gut als Mitbringsel.",
      engravingHint: "Name oder kurzer Spruch",
      presets: [
        "Beste Mama",
        "Bester Papa",
        "Beste Oma",
        "Bester Opa",
        "Liebe geht durch den Magen",
        "Kochen mit Herz",
        "Harley",
      ],
    },
    holzbrettchen: {
      name: "Kleines Holzbrett",
      blurb: "Handliches Brett zum Servieren oder Aufhängen. Familie, Sterne-Koch oder ein Motiv wie am Stand.",
      engravingHint: "Name, Titel oder kurzer Spruch",
      presets: [
        "Bester Papa der Welt",
        "Beste Oma der Welt",
        "Bester Opa der Welt",
        "Sterne Köchin",
        "Sterne Koch",
        "Harley",
      ],
    },
    bierkrug: {
      name: "Holz-Bierkrug",
      blurb: "Holz außen, Edelstahl innen, zwei Reifen. Gravur (Jahr, Name, Club) ist im Preis — so wie am Stand.",
      engravingHint: "Name, Jahr oder kurzer Text auf dem Krug",
      presets: ["1976", "Prost", "Bester Opa"],
    },
    "bierkrug-brett": {
      name: "Bierkrug-Brett",
      blurb: "Schneide- und Servierbrett in Krug-Silhouette, helles Holz. Name oder Spruch auf dem Bauch.",
      engravingHint: "Name oder Spruch",
      presets: ["Prost", "Stammplatz", "Bester Papa"],
    },
    "anhaenger-herz": {
      name: "Schlüsselanhänger Holzherz",
      blurb: "Kleines Herz aus Holz, Ring fertig. Fünf Stück werden über 4+1 zu 20 € — Namensgravur gratis.",
      engravingHint: "Name oder kurzes Wort",
      presets: [],
    },
    "anhaenger-leder": {
      name: "Schlüsselanhänger Lederband",
      blurb: "Lederquaste in der Farbe vom Stand, oft mit kleinem Holzplättchen. Gleicher Preis, gleiche 5er-Aktion.",
      engravingHint: "Name auf dem Plättchen — oder leer lassen",
      presets: [],
    },
  },
  options: {
    lederfarbe: {
      label: "Lederband",
      values: {
        natur: "Natur",
        braun: "Braun",
        schwarz: "Schwarz",
        rot: "Rot",
        blau: "Blau",
        gelb: "Gelb",
        rosa: "Rosa",
        gruen: "Grün",
        weiss: "Weiß",
      },
    },
  },
  close: "Schließen",
  engravingFree: "Namensgravur gratis",
  engravingLabel: "Gravurtext — {hint}",
  engravingPlaceholder: "Name oder Spruch",
  qtyLess: "Weniger",
  qtyMore: "Mehr",
  qty: "Menge",
  addToCart: "In den Korb",
  toastAdded: "Liegt im Korb.",
  cartTitle: "Korb",
  cartRule:
    "4+1 gratis auf alles, auch im Mix: ab fünf Artikeln ist jeder fünfte frei — wir nehmen immer den günstigsten. Fünf Anhänger à 5 € werden so zu 20 €.",
  cartEmpty: "Noch nichts im Korb.",
  engravingShort: "Gravur",
  remove: "Weg",
  subtotal: "Zwischensumme",
  fourPlusOne: "4+1",
  fourPlusOneFree: " ({count}× gratis)",
  total: "Summe",
  offerIncluded: "Aktion ist eingerechnet.",
  untilFree: "Noch {count} bis zum nächsten Gratisartikel.",
  continueReserve: "Weiter zur Vormerkung",
  backToShop: "Zur Auswahl",
  checkout: "Kasse",
  checkoutEmpty: "Der Korb ist leer. Erst etwas legen, dann vormerken.",
  checkoutTitle: "Bestellung vormerken",
  checkoutIntro:
    "Kein Bezahlen auf dieser Seite. Wir merken uns eure Zeilen nur im Browser und zeigen danach eine Zusammenfassung.",
  checkoutSummary: "{count} Stück · {total}",
  checkoutSummaryFree: " · {count}× 4+1 gratis",
  fieldName: "Name",
  fieldEmail: "E-Mail",
  fieldPhone: "Telefon (freiwillig)",
  fieldNote: "Notiz",
  notePlaceholder: "Abholung, Wunschtermin, Sondergravur…",
  submitReserve: "Bestellung vormerken",
  backToCart: "Zurück zum Korb",
  noOrderTitle: "Keine Vormerkung",
  noOrderBody: "Es liegt keine Bestellung in dieser Sitzung.",
  doneTitle: "Bestellung vorgemerkt",
  doneBody:
    "Nummer {code} — nur lokal in diesem Browser, noch nicht bezahlt und nicht an eine Kasse geschickt.",
  doneSummary: "{count} Stück · {total}",
  doneDiscount: " (davon {amount} 4+1)",
  newSelection: "Neue Auswahl",
  footerLine1: "drevaco.sk · Holz & Gravur · Arbeit aus Österreich",
  footerLine2:
    "Demo-Shop: der Korb bleibt im Browser. Keine Zahlung, kein Stripe, keine automatische Bestellmail.",
};

const en: Messages = {
  meta: {
    title: "DREVACO — Wood engraving",
    description:
      "DREVACO — personalised wood and leather engraving. Key racks, cooking spoons, boards, beer mugs and keyrings. Free name engraving. 4+1 free.",
  },
  skip: "Skip to content",
  nav: { shop: "Shop", items: "Shop", offers: "Offers" },
  lang: { group: "Choose language", sk: "Slovak", en: "English", de: "German" },
  cart: "Cart",
  cartAria: "Cart",
  cartAriaCount: "Cart, {count} items",
  promo: {
    region: "Offers",
    engravingTitle: "Name engraving",
    engravingBody: "Free name engraving on every item — a saying or a name, as at the stall.",
    fourTitle: "4+1 free",
    fourBody: "Mixed carts included: from five items, every fifth is free. We always take the cheapest.",
    pendantsTitle: "Keyrings",
    pendantsBody: "Keyrings 5 €, five pieces thus 20 € — the same rule.",
  },
  hero: {
    title: "Wood engraving",
    body: "Personalised pieces in wood and leather — a name or a short line, as at the stall. Reserve here only; there is no payment.",
    imageAlt: "Market stall with engraved wooden boards, beer mugs and keyrings",
    toShop: "See the shop",
    offerCta: "4+1 free",
  },
  offersTitle: "Offers",
  catalogTitle: "Our pieces",
  filters: "Categories",
  category: {
    alle: "All",
    schluesselbrett: "Key racks",
    kochloeffel: "Cooking spoons",
    holzbrettchen: "Boards",
    bierkrug: "Beer mugs",
    bierkrugbrett: "Mug boards",
    anhaenger: "Keyrings",
  },
  badge: {
    eur10: "10 €",
    eur3: "3 €",
    eur5: "5 €",
    engravingIncl: "Engraving incl.",
    fiveFor20: "5 / 20 €",
  },
  products: {
    "schluesselbrett-haus": {
      name: "House-shaped key rack",
      blurb:
        "House-shaped board in pale wood, two hooks, a stall saying or your own text. Name engraving is included.",
      engravingHint: "Saying or family name — e.g. the Maier family",
      presets: ["Home is where your heart is", "Home is where we are together", "Home is where hearts arrive"],
    },
    kochloeffel: {
      name: "Wooden spoon / spatula",
      blurb: "A pale wooden turner from the stall. A short line or name on the blade — a good small gift.",
      engravingHint: "Name or a short line",
      presets: [
        "Best Mum",
        "Best Dad",
        "Best Grandma",
        "Best Grandpa",
        "The way to the heart is through the stomach",
        "Cooking with heart",
        "Harley",
      ],
    },
    holzbrettchen: {
      name: "Small wooden board",
      blurb: "A handy board for serving or hanging. Family, star chef, or a motif as at the stall.",
      engravingHint: "Name, title or a short line",
      presets: [
        "Best dad in the world",
        "Best grandma in the world",
        "Best grandpa in the world",
        "Star chef",
        "Star cook",
        "Harley",
      ],
    },
    bierkrug: {
      name: "Wooden beer mug",
      blurb: "Wood outside, stainless steel inside, two hoops. Engraving (year, name, club) is included — as at the stall.",
      engravingHint: "Name, year or a short text on the mug",
      presets: ["1976", "Cheers", "Best Grandpa"],
    },
    "bierkrug-brett": {
      name: "Beer-mug board",
      blurb: "Cutting and serving board in a mug silhouette, pale wood. Name or a short line on the belly.",
      engravingHint: "Name or a short line",
      presets: ["Cheers", "Regular's table", "Best Dad"],
    },
    "anhaenger-herz": {
      name: "Wooden heart keyring",
      blurb: "A small wooden heart, ring fitted. Five pieces become 20 € with 4+1 — name engraving is free.",
      engravingHint: "Name or a short word",
      presets: [],
    },
    "anhaenger-leder": {
      name: "Leather-strap keyring",
      blurb: "A leather tassel in the stall colour, often with a small wood tag. Same price, same five-piece offer.",
      engravingHint: "Name on the tag — or leave blank",
      presets: [],
    },
  },
  options: {
    lederfarbe: {
      label: "Leather strap",
      values: {
        natur: "Natural",
        braun: "Brown",
        schwarz: "Black",
        rot: "Red",
        blau: "Blue",
        gelb: "Yellow",
        rosa: "Pink",
        gruen: "Green",
        weiss: "White",
      },
    },
  },
  close: "Close",
  engravingFree: "Name engraving included",
  engravingLabel: "Engraving — {hint}",
  engravingPlaceholder: "Name or a short line",
  qtyLess: "Less",
  qtyMore: "More",
  qty: "Quantity",
  addToCart: "Add to cart",
  toastAdded: "Added to cart.",
  cartTitle: "Cart",
  cartRule:
    "4+1 free on everything, including mixed carts: from five items, every fifth is free — we always take the cheapest. Five keyrings at 5 € thus become 20 €.",
  cartEmpty: "Nothing in the cart yet.",
  engravingShort: "Engraving",
  remove: "Remove",
  subtotal: "Subtotal",
  fourPlusOne: "4+1",
  fourPlusOneFree: " ({count}× free)",
  total: "Total",
  offerIncluded: "The offer is already included.",
  untilFree: "{count} more until the next free item.",
  continueReserve: "Continue to reservation",
  backToShop: "Back to the shop",
  checkout: "Checkout",
  checkoutEmpty: "The cart is empty. Add something first, then reserve.",
  checkoutTitle: "Reserve the order",
  checkoutIntro: "No payment on this page. We keep your lines in this browser only and then show a summary.",
  checkoutSummary: "{count} items · {total}",
  checkoutSummaryFree: " · {count}× 4+1 free",
  fieldName: "Name",
  fieldEmail: "Email",
  fieldPhone: "Phone (optional)",
  fieldNote: "Note",
  notePlaceholder: "Pickup, preferred time, special engraving…",
  submitReserve: "Reserve order",
  backToCart: "Back to the cart",
  noOrderTitle: "No reservation",
  noOrderBody: "There is no order in this session.",
  doneTitle: "Order reserved",
  doneBody: "Number {code} — stored only in this browser, not paid and not sent to a till.",
  doneSummary: "{count} items · {total}",
  doneDiscount: " (of which {amount} 4+1)",
  newSelection: "New selection",
  footerLine1: "drevaco.sk · Wood & engraving · Made in Austria",
  footerLine2: "Demo shop: the cart stays in this browser. No payment, no Stripe, no automatic order email.",
};

const sk: Messages = {
  meta: {
    title: "DREVACO — Gravírovanie dreva",
    description:
      "DREVACO — personalizované gravírovanie dreva a kože. Vešiaky na kľúče, varechy, doštičky, pivové krígle a prívesky. Gravírovanie mena zadarmo. 4+1 zadarmo.",
  },
  skip: "Preskočiť na obsah",
  nav: { shop: "Obchod", items: "Výber", offers: "Akcie" },
  lang: { group: "Vybrať jazyk", sk: "Slovenčina", en: "Angličtina", de: "Nemčina" },
  cart: "Košík",
  cartAria: "Košík",
  cartAriaCount: "Košík, {count} ks",
  promo: {
    region: "Akcie",
    engravingTitle: "Gravírovanie mena",
    engravingBody: "Bezplatné gravírovanie mena na všetky výrobky — nápis alebo meno, tak ako na stánku.",
    fourTitle: "4+1 zadarmo",
    fourBody: "Aj v mixe: od piatich kusov je každý piaty zadarmo. Vždy berieme najlacnejší.",
    pendantsTitle: "Prívesky",
    pendantsBody: "Prívesky na kľúče 5 €, päť kusov tak 20 € — to isté pravidlo.",
  },
  hero: {
    title: "Gravírovanie dreva",
    body: "Personalizované kúsky z dreva a kože — meno alebo nápis, tak ako na stánku. Tu si objednávku iba rezervujete, bez platby.",
    imageAlt: "Trhový stánok s gravírovanými drevenými doskami, kríglami a príveskami na kľúče",
    toShop: "K výberu",
    offerCta: "4+1 zadarmo",
  },
  offersTitle: "Akcie",
  catalogTitle: "Naše výrobky",
  filters: "Kategórie",
  category: {
    alle: "Všetko",
    schluesselbrett: "Vešiaky na kľúče",
    kochloeffel: "Varechy",
    holzbrettchen: "Doštičky",
    bierkrug: "Pivové krígle",
    bierkrugbrett: "Dosky ku krígľu",
    anhaenger: "Prívesky",
  },
  badge: {
    eur10: "10 €",
    eur3: "3 €",
    eur5: "5 €",
    engravingIncl: "Gravírovanie v cene",
    fiveFor20: "5 / 20 €",
  },
  products: {
    "schluesselbrett-haus": {
      name: "Vešiak na kľúče v tvare domu",
      blurb:
        "Doska v tvare domu zo svetlého dreva, dva háčiky, nápis zo stánku alebo váš vlastný text. Gravírovanie mena je v cene.",
      engravingHint: "Nápis alebo priezvisko — napr. rodina Novák",
      presets: [
        "Domov je tam, kde je tvoje srdce",
        "Domov je tam, kde sme spolu",
        "Domov je tam, kde srdcia prichádzajú",
      ],
    },
    kochloeffel: {
      name: "Varecha / obracačka",
      blurb: "Svetlá drevená obracačka zo stánku. Krátky nápis alebo meno na liste — vhodné ako drobný darček.",
      engravingHint: "Meno alebo krátky nápis",
      presets: [
        "Najlepšia mama",
        "Najlepší otec",
        "Najlepšia babička",
        "Najlepší dedko",
        "Láska ide cez žalúdok",
        "Varíme so srdcom",
        "Harley",
      ],
    },
    holzbrettchen: {
      name: "Malá drevená doštička",
      blurb: "Praktická doštička na servírovanie alebo zavesenie. Rodina, hviezdny kuchár alebo motív ako na stánku.",
      engravingHint: "Meno, titul alebo krátky nápis",
      presets: [
        "Najlepší otec na svete",
        "Najlepšia babička na svete",
        "Najlepší dedko na svete",
        "Hviezdna kuchárka",
        "Hviezdny kuchár",
        "Harley",
      ],
    },
    bierkrug: {
      name: "Drevený pivový krígeľ",
      blurb: "Drevo vonku, nerez vnútri, dva obruče. Gravírovanie (rok, meno, klub) je v cene — tak ako na stánku.",
      engravingHint: "Meno, rok alebo krátky text na krígli",
      presets: ["1976", "Nazdravie", "Najlepší dedko"],
    },
    "bierkrug-brett": {
      name: "Doska v tvare krígľa",
      blurb: "Krájacia a servírovacia doska v siluete krígľa, svetlé drevo. Meno alebo nápis na bruchu.",
      engravingHint: "Meno alebo nápis",
      presets: ["Nazdravie", "Stály stôl", "Najlepší otec"],
    },
    "anhaenger-herz": {
      name: "Prívesok na kľúče — drevené srdce",
      blurb: "Malé drevené srdiečko, krúžok je pripravený. Päť kusov je cez 4+1 za 20 € — gravírovanie mena zadarmo.",
      engravingHint: "Meno alebo krátke slovo",
      presets: [],
    },
    "anhaenger-leder": {
      name: "Prívesok na kľúče — kožený remienok",
      blurb: "Kožený strapec vo farbe zo stánku, často s malou drevenou doštičkou. Rovnaká cena, rovnaká akcia na päť kusov.",
      engravingHint: "Meno na doštičke — alebo nechajte prázdne",
      presets: [],
    },
  },
  options: {
    lederfarbe: {
      label: "Kožený remienok",
      values: {
        natur: "Prírodná",
        braun: "Hnedá",
        schwarz: "Čierna",
        rot: "Červená",
        blau: "Modrá",
        gelb: "Žltá",
        rosa: "Ružová",
        gruen: "Zelená",
        weiss: "Biela",
      },
    },
  },
  close: "Zavrieť",
  engravingFree: "Gravírovanie mena zadarmo",
  engravingLabel: "Text gravírovania — {hint}",
  engravingPlaceholder: "Meno alebo nápis",
  qtyLess: "Menej",
  qtyMore: "Viac",
  qty: "Množstvo",
  addToCart: "Do košíka",
  toastAdded: "Je v košíku.",
  cartTitle: "Košík",
  cartRule:
    "4+1 zadarmo na všetko, aj v mixe: od piatich kusov je každý piaty zadarmo — vždy berieme najlacnejší. Päť príveskov po 5 € tak stojí 20 €.",
  cartEmpty: "Košík je zatiaľ prázdny.",
  engravingShort: "Gravírovanie",
  remove: "Odstrániť",
  subtotal: "Medzisúčet",
  fourPlusOne: "4+1",
  fourPlusOneFree: " ({count}× zadarmo)",
  total: "Spolu",
  offerIncluded: "Akcia je už započítaná.",
  untilFree: "Ešte {count} do ďalšieho kusu zadarmo.",
  continueReserve: "Pokračovať k rezervácii",
  backToShop: "Späť na výber",
  checkout: "Pokladňa",
  checkoutEmpty: "Košík je prázdny. Najprv niečo vložte, potom rezervujte.",
  checkoutTitle: "Predbežne rezervovať objednávku",
  checkoutIntro:
    "Na tejto stránke sa neplatí. Riadky si zapamätáme len v prehliadači a potom ukážeme súhrn.",
  checkoutSummary: "{count} ks · {total}",
  checkoutSummaryFree: " · {count}× 4+1 zadarmo",
  fieldName: "Meno",
  fieldEmail: "E-mail",
  fieldPhone: "Telefón (nepovinné)",
  fieldNote: "Poznámka",
  notePlaceholder: "Odber, termín, zvláštne gravírovanie…",
  submitReserve: "Predbežne rezervovať objednávku",
  backToCart: "Späť do košíka",
  noOrderTitle: "Žiadna rezervácia",
  noOrderBody: "V tejto relácii nie je žiadna objednávka.",
  doneTitle: "Objednávka predbežne rezervovaná",
  doneBody: "Číslo {code} — iba lokálne v tomto prehliadači, ešte nezaplatené a neodoslané na pokladňu.",
  doneSummary: "{count} ks · {total}",
  doneDiscount: " (z toho {amount} 4+1)",
  newSelection: "Nový výber",
  footerLine1: "drevaco.sk · Drevo a gravírovanie · Práca z Rakúska",
  footerLine2: "Demo obchod: košík ostáva v prehliadači. Bez platby, bez Stripe, bez automatického e-mailu o objednávke.",
};

export const MESSAGES: Record<Locale, Messages> = { sk, en, de };
