/** 4+1 gratis: ab 5 Stück ist jeder fünfte Artikel frei — immer die günstigsten. Mix erlaubt. */
export const FOUR_PLUS_ONE_EVERY = 5;

export type PromoBreakdown = {
  itemCount: number;
  subtotalCents: number;
  freeCount: number;
  discountCents: number;
  totalCents: number;
};

export function applyFourPlusOne(unitPricesCents: readonly number[]): PromoBreakdown {
  const itemCount = unitPricesCents.length;
  const subtotalCents = unitPricesCents.reduce((sum, price) => sum + price, 0);
  const freeCount = Math.floor(itemCount / FOUR_PLUS_ONE_EVERY);
  const cheapestFirst = [...unitPricesCents].sort((a, b) => a - b);
  const discountCents = cheapestFirst.slice(0, freeCount).reduce((sum, price) => sum + price, 0);
  return {
    itemCount,
    subtotalCents,
    freeCount,
    discountCents,
    totalCents: subtotalCents - discountCents,
  };
}

export function unitsUntilNextFree(itemCount: number): number {
  if (itemCount <= 0) return FOUR_PLUS_ONE_EVERY;
  const remainder = itemCount % FOUR_PLUS_ONE_EVERY;
  return remainder === 0 ? FOUR_PLUS_ONE_EVERY : FOUR_PLUS_ONE_EVERY - remainder;
}
