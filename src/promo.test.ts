import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyFourPlusOne, unitsUntilNextFree } from "./promo";

describe("4+1 gratis", () => {
  it("gibt nichts frei unter fünf Stück", () => {
    const result = applyFourPlusOne([500, 500, 300, 1000]);
    assert.equal(result.freeCount, 0);
    assert.equal(result.discountCents, 0);
    assert.equal(result.totalCents, 2300);
  });

  it("macht bei fünf Stück den günstigsten gratis", () => {
    const result = applyFourPlusOne([2500, 1000, 500, 300, 300]);
    assert.equal(result.freeCount, 1);
    assert.equal(result.discountCents, 300);
    assert.equal(result.subtotalCents, 4600);
    assert.equal(result.totalCents, 4300);
  });

  it("macht fünf Schlüsselanhänger zu 20 €", () => {
    const result = applyFourPlusOne([500, 500, 500, 500, 500]);
    assert.equal(result.freeCount, 1);
    assert.equal(result.totalCents, 2000);
  });

  it("gibt bei zehn Stück zwei günstigste frei", () => {
    const result = applyFourPlusOne([300, 300, 500, 500, 1000, 1000, 2500, 500, 300, 500]);
    assert.equal(result.itemCount, 10);
    assert.equal(result.freeCount, 2);
    assert.equal(result.discountCents, 600);
  });

  it("gilt im Mix — der günstigste fliegt, nicht der letzte", () => {
    const result = applyFourPlusOne([2500, 2500, 2500, 2500, 300]);
    assert.equal(result.discountCents, 300);
    assert.equal(result.totalCents, 10000);
  });

  it("zählt den Weg zum nächsten Gratisstück", () => {
    assert.equal(unitsUntilNextFree(0), 5);
    assert.equal(unitsUntilNextFree(4), 1);
    assert.equal(unitsUntilNextFree(5), 5);
    assert.equal(unitsUntilNextFree(7), 3);
  });
});
