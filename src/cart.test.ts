import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  addLine,
  cartItemCount,
  cartTotals,
  expandUnitPrices,
  normalizeEngraving,
  removeLine,
  setLineEngraving,
  setLineQty,
} from "./cart";

describe("Warenkorb", () => {
  it("fasst gleiche Gravur zusammen", () => {
    let cart = addLine([], { productId: "kochloeffel", engraving: "Beste Mama", qty: 1 });
    cart = addLine(cart, { productId: "kochloeffel", engraving: "  Beste Mama ", qty: 2 });
    assert.equal(cart.length, 1);
    assert.equal(cart[0]?.qty, 3);
  });

  it("hält verschiedene Gravuren getrennt", () => {
    let cart = addLine([], { productId: "anhaenger-herz", engraving: "Anna" });
    cart = addLine(cart, { productId: "anhaenger-herz", engraving: "Ben" });
    assert.equal(cart.length, 2);
    assert.equal(cartItemCount(cart), 2);
  });

  it("rechnet 4+1 über Mengen und Mix", () => {
    let cart = addLine([], { productId: "anhaenger-herz", engraving: "Anna", qty: 3 });
    cart = addLine(cart, { productId: "kochloeffel", engraving: "Oma", qty: 2 });
    const units = expandUnitPrices(cart);
    assert.deepEqual(units.sort((a, b) => a - b), [300, 300, 500, 500, 500]);
    const totals = cartTotals(cart);
    assert.equal(totals.itemCount, 5);
    assert.equal(totals.freeCount, 1);
    assert.equal(totals.discountCents, 300);
    assert.equal(totals.totalCents, 1800);
  });

  it("ändert Menge und Gravur an der Zeile", () => {
    let cart = addLine([], { productId: "holzbrettchen", engraving: "Papa" });
    const id = cart[0]?.id;
    assert.ok(id);
    cart = setLineQty(cart, id, 4);
    cart = setLineEngraving(cart, id, "  Bester Papa  ");
    assert.equal(cart[0]?.qty, 4);
    assert.equal(cart[0]?.engraving, "Bester Papa");
    cart = setLineQty(cart, id, 0);
    assert.equal(cart.length, 0);
  });

  it("entfernt eine Zeile", () => {
    let cart = addLine([], { productId: "bierkrug", engraving: "1976" });
    cart = removeLine(cart, cart[0]!.id);
    assert.equal(cart.length, 0);
  });

  it("ignoriert unbekannte Artikel", () => {
    const cart = addLine([], { productId: "gibt-es-nicht", engraving: "x" });
    assert.equal(cart.length, 0);
  });

  it("normalisiert Gravurtext", () => {
    assert.equal(normalizeEngraving("  Anna   Maria \n"), "Anna Maria");
  });
});
