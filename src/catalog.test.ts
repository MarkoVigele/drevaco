import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { productById, PRODUCTS, productsInCategory } from "./catalog";

describe("Katalog", () => {
  it("hat die Stand-Preise in Cent", () => {
    assert.equal(productById("schluesselbrett-haus")?.priceCents, 1000);
    assert.equal(productById("kochloeffel")?.priceCents, 300);
    assert.equal(productById("holzbrettchen")?.priceCents, 500);
    assert.equal(productById("bierkrug")?.priceCents, 2500);
    assert.equal(productById("bierkrug-brett")?.priceCents, 1000);
    assert.equal(productById("anhaenger-herz")?.priceCents, 500);
    assert.equal(productById("anhaenger-leder")?.priceCents, 500);
  });

  it("filtert Kategorien", () => {
    assert.equal(productsInCategory("alle").length, PRODUCTS.length);
    assert.ok(productsInCategory("anhaenger").every((p) => p.category === "anhaenger"));
    assert.equal(productsInCategory("bierkrug").length, 1);
  });
});
