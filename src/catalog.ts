export type CategoryId =
  | "schluesselbrett"
  | "kochloeffel"
  | "holzbrettchen"
  | "bierkrug"
  | "bierkrugbrett"
  | "anhaenger";

export type ProductOption = {
  id: string;
  label: string;
  values: readonly { id: string; label: string }[];
};

export type Product = {
  id: string;
  category: CategoryId;
  name: string;
  priceCents: number;
  image: string;
  blurb: string;
  engravingHint: string;
  presets: readonly string[];
  option?: ProductOption;
  badge?: string;
};

export type Category = {
  id: CategoryId | "alle";
  label: string;
};

export const CATEGORIES: readonly Category[] = [
  { id: "alle", label: "Alles" },
  { id: "schluesselbrett", label: "Schlüsselbretter" },
  { id: "kochloeffel", label: "Kochlöffel" },
  { id: "holzbrettchen", label: "Bretter" },
  { id: "bierkrug", label: "Bierkrüge" },
  { id: "bierkrugbrett", label: "Krugbretter" },
  { id: "anhaenger", label: "Anhänger" },
];

const LEDER_FARBEN: ProductOption = {
  id: "lederfarbe",
  label: "Lederband",
  values: [
    { id: "natur", label: "Natur" },
    { id: "braun", label: "Braun" },
    { id: "schwarz", label: "Schwarz" },
    { id: "rot", label: "Rot" },
    { id: "blau", label: "Blau" },
    { id: "gelb", label: "Gelb" },
    { id: "rosa", label: "Rosa" },
    { id: "gruen", label: "Grün" },
    { id: "weiss", label: "Weiß" },
  ],
};

export const PRODUCTS: readonly Product[] = [
  {
    id: "schluesselbrett-haus",
    category: "schluesselbrett",
    name: "Schlüsselbrett Hausform",
    priceCents: 1000,
    image: "schluesselbrett.jpg",
    blurb:
      "Hausförmiges Brett aus hellem Holz, zwei Haken, Spruch vom Stand oder euer eigener Text. Namensgravur ist im Preis.",
    engravingHint: "Spruch oder Familienname — z. B. Familie Maier",
    presets: [
      "Zuhause ist, wo dein Herz ist",
      "Zuhause ist, wo wir zusammen sind",
      "Zuhause ist da, wo Herzen ankommen",
    ],
    badge: "10 €",
  },
  {
    id: "kochloeffel",
    category: "kochloeffel",
    name: "Kochlöffel / Pfannenwender",
    priceCents: 300,
    image: "kochloeffel.jpg",
    blurb:
      "Heller Holzwender vom Marktstand. Kurzer Spruch oder Name auf dem Blatt — gut als Mitbringsel.",
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
    badge: "3 €",
  },
  {
    id: "holzbrettchen",
    category: "holzbrettchen",
    name: "Kleines Holzbrett",
    priceCents: 500,
    image: "holzbrettchen.jpg",
    blurb:
      "Handliches Brett zum Servieren oder Aufhängen. Familie, Sterne-Koch oder ein Motiv wie am Stand.",
    engravingHint: "Name, Titel oder kurzer Spruch",
    presets: [
      "Bester Papa der Welt",
      "Beste Oma der Welt",
      "Bester Opa der Welt",
      "Sterne Köchin",
      "Sterne Koch",
      "Harley",
    ],
    badge: "5 €",
  },
  {
    id: "bierkrug",
    category: "bierkrug",
    name: "Holz-Bierkrug",
    priceCents: 2500,
    image: "bierkrug.jpg",
    blurb:
      "Holz außen, Edelstahl innen, zwei Reifen. Gravur (Jahr, Name, Club) ist im Preis — so wie am Stand.",
    engravingHint: "Name, Jahr oder kurzer Text auf dem Krug",
    presets: ["1976", "Prost", "Bester Opa"],
    badge: "Gravur inkl.",
  },
  {
    id: "bierkrug-brett",
    category: "bierkrugbrett",
    name: "Bierkrug-Brett",
    priceCents: 1000,
    image: "bierkrug-brett.jpg",
    blurb:
      "Schneide- und Servierbrett in Krug-Silhouette, helles Holz. Name oder Spruch auf dem Bauch.",
    engravingHint: "Name oder Spruch",
    presets: ["Prost", "Stammplatz", "Bester Papa"],
    badge: "10 €",
  },
  {
    id: "anhaenger-herz",
    category: "anhaenger",
    name: "Schlüsselanhänger Holzherz",
    priceCents: 500,
    image: "anhaenger-herz.jpg",
    blurb:
      "Kleines Herz aus Holz, Ring fertig. Fünf Stück werden über 4+1 zu 20 € — Namensgravur gratis.",
    engravingHint: "Name oder kurzes Wort",
    presets: [],
    badge: "5 / 20 €",
  },
  {
    id: "anhaenger-leder",
    category: "anhaenger",
    name: "Schlüsselanhänger Lederband",
    priceCents: 500,
    image: "anhaenger-leder.jpg",
    blurb:
      "Lederquaste in der Farbe vom Stand, oft mit kleinem Holzplättchen. Gleicher Preis, gleiche 5er-Aktion.",
    engravingHint: "Name auf dem Plättchen — oder leer lassen",
    presets: [],
    option: LEDER_FARBEN,
    badge: "5 / 20 €",
  },
];

export function productById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function productsInCategory(category: CategoryId | "alle"): readonly Product[] {
  if (category === "alle") return PRODUCTS;
  return PRODUCTS.filter((product) => product.category === category);
}

export function assetUrl(file: string): string {
  return `${import.meta.env.BASE_URL}products/${file}`;
}
