import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PRODUCTS } from "./catalog";
import {
  detectLocale,
  getLocale,
  interpolate,
  isLocale,
  LOCALES,
  MESSAGES,
  setLocale,
} from "./i18n";

function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return [`${prefix}[]:${value.length}`];
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, nested]) =>
      keyPaths(nested, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

describe("i18n", () => {
  it("erkennt sk*, en* und fällt sonst auf Deutsch", () => {
    assert.equal(detectLocale(null, ["sk-SK"]), "sk");
    assert.equal(detectLocale(null, ["sk"]), "sk");
    assert.equal(detectLocale(null, ["en-GB"]), "en");
    assert.equal(detectLocale(null, ["en-US"]), "en");
    assert.equal(detectLocale(null, ["de-AT"]), "de");
    assert.equal(detectLocale(null, ["fr-FR"]), "de");
    assert.equal(detectLocale(null, []), "de");
  });

  it("nimmt die gespeicherte Wahl vor der Browsersprache", () => {
    assert.equal(detectLocale("sk", ["en-US"]), "sk");
    assert.equal(detectLocale("en", ["de-DE"]), "en");
    assert.equal(detectLocale("de", ["sk-SK"]), "de");
    assert.equal(detectLocale("xx", ["en-GB"]), "en");
  });

  it("prüft Locale-Codes", () => {
    assert.equal(isLocale("sk"), true);
    assert.equal(isLocale("en"), true);
    assert.equal(isLocale("de"), true);
    assert.equal(isLocale("fr"), false);
  });

  it("hat in SK, EN und DE dieselben Schlüssel", () => {
    const de = keyPaths(MESSAGES.de);
    assert.deepEqual(keyPaths(MESSAGES.en), de);
    assert.deepEqual(keyPaths(MESSAGES.sk), de);
    assert.deepEqual([...LOCALES].sort(), ["de", "en", "sk"]);
  });

  it("übersetzt jeden Katalogartikel", () => {
    for (const product of PRODUCTS) {
      for (const locale of LOCALES) {
        const copy = MESSAGES[locale].products[product.id];
        assert.ok(copy.name);
        assert.ok(copy.blurb);
        assert.ok(copy.engravingHint);
      }
    }
  });

  it("setzt die Locale und interpoliert Platzhalter", () => {
    setLocale("en");
    assert.equal(getLocale(), "en");
    assert.equal(interpolate("Cart, {count} items", { count: 2 }), "Cart, 2 items");
    assert.equal(interpolate("Noch {count}", {}), "Noch {count}");
    setLocale("de");
    assert.equal(getLocale(), "de");
  });
});
