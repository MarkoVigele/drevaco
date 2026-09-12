import { productById, type Product } from "./catalog";
import { applyFourPlusOne, type PromoBreakdown } from "./promo";

export const CART_STORAGE_KEY = "drevaco.cart.v1";

export type CartLine = {
  id: string;
  productId: string;
  qty: number;
  engraving: string;
  optionValue?: string;
};

export type CartTotals = PromoBreakdown & {
  lines: readonly (CartLine & { product: Product; lineSubtotalCents: number })[];
};

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `ln-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function normalizeEngraving(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function sameLine(a: CartLine, b: Pick<CartLine, "productId" | "engraving" | "optionValue">): boolean {
  return (
    a.productId === b.productId &&
    normalizeEngraving(a.engraving) === normalizeEngraving(b.engraving) &&
    (a.optionValue ?? "") === (b.optionValue ?? "")
  );
}

export function addLine(
  cart: readonly CartLine[],
  input: { productId: string; qty?: number; engraving: string; optionValue?: string },
): CartLine[] {
  const product = productById(input.productId);
  if (!product) return [...cart];
  const qty = Math.max(1, Math.floor(input.qty ?? 1));
  const engraving = normalizeEngraving(input.engraving);
  const match: Pick<CartLine, "productId" | "engraving" | "optionValue"> = {
    productId: input.productId,
    engraving,
  };
  if (input.optionValue !== undefined) match.optionValue = input.optionValue;
  const existing = cart.find((line) => sameLine(line, match));
  if (existing) {
    return cart.map((line) => (line.id === existing.id ? { ...line, qty: line.qty + qty } : line));
  }
  const line: CartLine = {
    id: newId(),
    productId: input.productId,
    qty,
    engraving,
  };
  if (input.optionValue !== undefined) line.optionValue = input.optionValue;
  return [...cart, line];
}

export function setLineQty(cart: readonly CartLine[], lineId: string, qty: number): CartLine[] {
  const nextQty = Math.floor(qty);
  if (nextQty <= 0) return cart.filter((line) => line.id !== lineId);
  return cart.map((line) => (line.id === lineId ? { ...line, qty: nextQty } : line));
}

export function setLineEngraving(cart: readonly CartLine[], lineId: string, engraving: string): CartLine[] {
  return cart.map((line) => (line.id === lineId ? { ...line, engraving: normalizeEngraving(engraving) } : line));
}

export function removeLine(cart: readonly CartLine[], lineId: string): CartLine[] {
  return cart.filter((line) => line.id !== lineId);
}

export function cartItemCount(cart: readonly CartLine[]): number {
  return cart.reduce((sum, line) => sum + line.qty, 0);
}

export function expandUnitPrices(cart: readonly CartLine[]): number[] {
  const prices: number[] = [];
  for (const line of cart) {
    const product = productById(line.productId);
    if (!product) continue;
    for (let i = 0; i < line.qty; i += 1) prices.push(product.priceCents);
  }
  return prices;
}

export function cartTotals(cart: readonly CartLine[]): CartTotals {
  const lines = cart.flatMap((line) => {
    const product = productById(line.productId);
    if (!product) return [];
    return [{ ...line, product, lineSubtotalCents: product.priceCents * line.qty }];
  });
  return { lines, ...applyFourPlusOne(expandUnitPrices(cart)) };
}

export function loadCart(): CartLine[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry) => {
      if (!entry || typeof entry !== "object") return [];
      const row = entry as Partial<CartLine>;
      if (typeof row.id !== "string" || typeof row.productId !== "string") return [];
      if (!productById(row.productId)) return [];
      const qty = typeof row.qty === "number" && Number.isFinite(row.qty) ? Math.max(1, Math.floor(row.qty)) : 1;
      const line: CartLine = {
        id: row.id,
        productId: row.productId,
        qty,
        engraving: typeof row.engraving === "string" ? row.engraving : "",
      };
      if (typeof row.optionValue === "string") line.optionValue = row.optionValue;
      return [line];
    });
  } catch {
    return [];
  }
}

export function saveCart(cart: readonly CartLine[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}
