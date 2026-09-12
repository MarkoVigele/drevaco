export type CategoryId =
  | "schluesselbrett"
  | "kochloeffel"
  | "holzbrettchen"
  | "bierkrug"
  | "bierkrugbrett"
  | "anhaenger";

export type ProductId =
  | "schluesselbrett-haus"
  | "kochloeffel"
  | "holzbrettchen"
  | "bierkrug"
  | "bierkrug-brett"
  | "anhaenger-herz"
  | "anhaenger-leder";

export type BadgeId = "eur10" | "eur3" | "eur5" | "engravingIncl" | "fiveFor20";

export type LeatherColorId =
  | "natur"
  | "braun"
  | "schwarz"
  | "rot"
  | "blau"
  | "gelb"
  | "rosa"
  | "gruen"
  | "weiss";

export type ProductOption = {
  id: "lederfarbe";
  values: readonly { id: LeatherColorId }[];
};

export type Product = {
  id: ProductId;
  category: CategoryId;
  priceCents: number;
  image: string;
  option?: ProductOption;
  badge?: BadgeId;
};

export type Category = {
  id: CategoryId | "alle";
};

export const CATEGORY_IDS: readonly Category["id"][] = [
  "alle",
  "schluesselbrett",
  "kochloeffel",
  "holzbrettchen",
  "bierkrug",
  "bierkrugbrett",
  "anhaenger",
];

const LEDER_FARBEN: ProductOption = {
  id: "lederfarbe",
  values: [
    { id: "natur" },
    { id: "braun" },
    { id: "schwarz" },
    { id: "rot" },
    { id: "blau" },
    { id: "gelb" },
    { id: "rosa" },
    { id: "gruen" },
    { id: "weiss" },
  ],
};

export const PRODUCTS: readonly Product[] = [
  {
    id: "schluesselbrett-haus",
    category: "schluesselbrett",
    priceCents: 1000,
    image: "schluesselbrett.jpg",
    badge: "eur10",
  },
  {
    id: "kochloeffel",
    category: "kochloeffel",
    priceCents: 300,
    image: "kochloeffel.jpg",
    badge: "eur3",
  },
  {
    id: "holzbrettchen",
    category: "holzbrettchen",
    priceCents: 500,
    image: "holzbrettchen.jpg",
    badge: "eur5",
  },
  {
    id: "bierkrug",
    category: "bierkrug",
    priceCents: 2500,
    image: "bierkrug.jpg",
    badge: "engravingIncl",
  },
  {
    id: "bierkrug-brett",
    category: "bierkrugbrett",
    priceCents: 1000,
    image: "bierkrug-brett.jpg",
    badge: "eur10",
  },
  {
    id: "anhaenger-herz",
    category: "anhaenger",
    priceCents: 500,
    image: "anhaenger-herz.jpg",
    badge: "fiveFor20",
  },
  {
    id: "anhaenger-leder",
    category: "anhaenger",
    priceCents: 500,
    image: "anhaenger-leder.jpg",
    option: LEDER_FARBEN,
    badge: "fiveFor20",
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
