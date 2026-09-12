import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { transformWithEsbuild } from "vite";
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

  it("baut Produktbild-URLs mit BASE_URL", async () => {
    const source = await readFile(new URL("./catalog.ts", import.meta.url), "utf8");
    assert.match(source, /\$\{import\.meta\.env\.BASE_URL\}products\/\$\{file\}/);

    const { code } = await transformWithEsbuild(source, "catalog.ts", {
      define: { "import.meta.env.BASE_URL": JSON.stringify("/drevaco/") },
      format: "cjs",
    });
    const module = { exports: {} as { assetUrl: (file: string) => string } };
    new Function("exports", "module", code)(module.exports, module);

    assert.equal(module.exports.assetUrl("schluesselbrett.jpg"), "/drevaco/products/schluesselbrett.jpg");
    assert.equal(module.exports.assetUrl("logo-mark.png"), "/drevaco/products/logo-mark.png");
  });
});
