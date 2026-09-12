import { assetUrl, CATEGORIES, productById, productsInCategory, type CategoryId, type Product } from "./catalog";
import {
  addLine,
  cartItemCount,
  cartTotals,
  loadCart,
  removeLine,
  saveCart,
  setLineEngraving,
  setLineQty,
  type CartLine,
} from "./cart";
import { formatEuro } from "./money";
import { unitsUntilNextFree } from "./promo";

type View = "shop" | "checkout" | "done";
type Drawer = { kind: "product"; id: string } | { kind: "cart" } | null;

type Order = {
  code: string;
  name: string;
  email: string;
  phone: string;
  note: string;
  lines: CartLine[];
  totalCents: number;
  discountCents: number;
  itemCount: number;
};

type State = {
  filter: CategoryId | "alle";
  cart: CartLine[];
  drawer: Drawer;
  view: View;
  toast: string | null;
  order: Order | null;
};

const state: State = {
  filter: "alle",
  cart: loadCart(),
  drawer: null,
  view: "shop",
  toast: null,
  order: null,
};

let toastTimer = 0;
let root: Element | null = null;

function persist(): void {
  saveCart(state.cart);
}

function toast(message: string): void {
  state.toast = message;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    state.toast = null;
    render();
  }, 2200);
  render();
}

function openHash(): void {
  const hash = location.hash.replace(/^#\/?/, "");
  const [head, id] = hash.split("/");
  if (head === "kasse") {
    state.view = "checkout";
    state.drawer = null;
    return;
  }
  if (head === "vorgemerkt") {
    state.view = "done";
    state.drawer = null;
    return;
  }
  state.view = "shop";
  if (head === "korb") {
    state.drawer = { kind: "cart" };
    return;
  }
  if (head === "p" && id && productById(id)) {
    state.drawer = { kind: "product", id };
    return;
  }
  state.drawer = null;
}

function go(hash: string): void {
  const next = hash.startsWith("#") ? hash : `#/${hash}`;
  if (location.hash === next) {
    openHash();
    render();
    return;
  }
  location.hash = next;
}

function optionLabel(product: Product, value?: string): string {
  if (!value || !product.option) return "";
  return product.option.values.find((entry) => entry.id === value)?.label ?? value;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function header(): string {
  const count = cartItemCount(state.cart);
  return `
    <a class="skip" href="#inhalt">Zum Inhalt</a>
    <header class="top">
      <a class="brand" href="#/" data-go="/">
        <img src="${assetUrl("logo-mark.png")}" alt="" width="40" height="40" />
        <span>
          <span class="brand-name">drevaco.sk</span>
          <span class="brand-sub">Holz &amp; Leder, graviert</span>
        </span>
      </a>
      <button class="icon-btn" type="button" data-go="korb" ${count ? `data-count="${count}"` : ""} aria-label="Warenkorb${count ? `, ${count} Stück` : ""}">Korb</button>
    </header>
  `;
}

function shopView(): string {
  const list = productsInCategory(state.filter);
  return `
    <main id="inhalt" class="wrap">
      <div class="promo" aria-label="Aktionen">
        <span class="chip"><strong>Kostenlose Namensgravur</strong> auf alles</span>
        <span class="chip"><strong>4+1 gratis</strong> — auch im Mix</span>
        <span class="chip">Anhänger: 5 Stück 20&nbsp;€</span>
      </div>
      <section class="hero">
        <div class="hero-copy">
          <h1>Vom Marktstand auf den Tisch.</h1>
          <p>Wir gravieren Holz und Leder mit eurem Namen oder Spruch — so wie am Stand. Bestellung hier nur vormerken, ohne Zahlung. Abholung oder Übergabe klären wir danach.</p>
        </div>
        <div class="hero-visual">
          <img src="${assetUrl("hero-stand.jpg")}" alt="Marktstand mit gravierten Holzbrettern, Bierkrügen und Schlüsselanhängern" />
        </div>
      </section>
      <div class="filters" role="tablist" aria-label="Kategorien">
        ${CATEGORIES.map(
          (cat) => `
          <button class="filter" type="button" role="tab" data-filter="${cat.id}" aria-pressed="${state.filter === cat.id}">${escapeHtml(cat.label)}</button>
        `,
        ).join("")}
      </div>
      <section class="grid" aria-live="polite">
        ${list
          .map(
            (product) => `
          <button class="card" type="button" data-go="p/${product.id}">
            <img src="${assetUrl(product.image)}" alt="" />
            <div class="card-body">
              ${product.badge ? `<span class="badge">${escapeHtml(product.badge)}</span>` : ""}
              <h2>${escapeHtml(product.name)}</h2>
              <div class="price">${formatEuro(product.priceCents)}</div>
            </div>
          </button>
        `,
          )
          .join("")}
      </section>
    </main>
    <footer class="foot wrap">
      <p>drevaco.sk · Arbeit aus Österreich · INGENIUMOWL</p>
      <p>Demo-Shop: der Korb bleibt im Browser. Keine Zahlung, kein Stripe, keine automatische Bestellmail.</p>
    </footer>
  `;
}

function checkoutView(): string {
  const totals = cartTotals(state.cart);
  if (totals.itemCount === 0) {
    return `
      <main id="inhalt" class="wrap page">
        <h1>Kasse</h1>
        <p class="empty">Der Korb ist leer. Erst etwas legen, dann vormerken.</p>
        <button class="btn" type="button" data-go="/">Zur Auswahl</button>
      </main>
    `;
  }
  return `
    <main id="inhalt" class="wrap page">
      <h1>Bestellung vormerken</h1>
      <p class="muted">Kein Bezahlen auf dieser Seite. Wir merken uns eure Zeilen nur im Browser und zeigen danach eine Zusammenfassung.</p>
      <p class="rule">${totals.itemCount} Stück · ${formatEuro(totals.totalCents)}${totals.freeCount ? ` · ${totals.freeCount}× 4+1 gratis` : ""}</p>
      <form class="form-grid" data-checkout>
        <label class="field"><span>Name</span><input name="name" required autocomplete="name" /></label>
        <label class="field"><span>E-Mail</span><input name="email" type="email" required autocomplete="email" /></label>
        <label class="field"><span>Telefon (freiwillig)</span><input name="phone" type="tel" autocomplete="tel" /></label>
        <label class="field"><span>Notiz</span><textarea name="note" placeholder="Abholung, Wunschtermin, Sondergravur…"></textarea></label>
        <button class="btn wide" type="submit">Bestellung vormerken</button>
        <button class="btn ghost wide" type="button" data-go="korb">Zurück zum Korb</button>
      </form>
    </main>
  `;
}

function doneView(): string {
  const order = state.order;
  if (!order) {
    return `
      <main id="inhalt" class="wrap page">
        <h1>Keine Vormerkung</h1>
        <p class="muted">Es liegt keine Bestellung in dieser Sitzung.</p>
        <button class="btn" type="button" data-go="/">Zur Auswahl</button>
      </main>
    `;
  }
  return `
    <main id="inhalt" class="wrap done">
      <img src="${assetUrl("logo-disk.jpg")}" alt="" />
      <h1>Bestellung vorgemerkt</h1>
      <p class="muted">Nummer <strong>${escapeHtml(order.code)}</strong> — nur lokal in diesem Browser, noch nicht bezahlt und nicht an eine Kasse geschickt.</p>
      <div class="order-box">
        <p><strong>${escapeHtml(order.name)}</strong><br />${escapeHtml(order.email)}${order.phone ? `<br />${escapeHtml(order.phone)}` : ""}</p>
        <ul>
          ${order.lines
            .map((line) => {
              const product = productById(line.productId);
              if (!product) return "";
              const extra = optionLabel(product, line.optionValue);
              return `<li>${line.qty}× ${escapeHtml(product.name)}${extra ? ` · ${escapeHtml(extra)}` : ""}${line.engraving ? ` — „${escapeHtml(line.engraving)}“` : ""}</li>`;
            })
            .join("")}
        </ul>
        <p>${order.itemCount} Stück · ${formatEuro(order.totalCents)}${order.discountCents ? ` (davon ${formatEuro(order.discountCents)} 4+1)` : ""}</p>
        ${order.note ? `<p class="muted">${escapeHtml(order.note)}</p>` : ""}
      </div>
      <p><button class="btn" type="button" data-new>Neue Auswahl</button></p>
    </main>
  `;
}

function productDrawer(id: string): string {
  const product = productById(id);
  if (!product) return "";
  const option = product.option
    ? `<label class="field"><span>${escapeHtml(product.option.label)}</span>
        <select name="option">${product.option.values.map((value) => `<option value="${value.id}">${escapeHtml(value.label)}</option>`).join("")}</select>
      </label>`
    : "";
  return `
    <button class="scrim" type="button" data-go="/" aria-label="Schließen"></button>
    <aside class="drawer drawer-product" role="dialog" aria-modal="true" aria-labelledby="p-title">
      <img class="hero-img" src="${assetUrl(product.image)}" alt="" />
      <h2 id="p-title">${escapeHtml(product.name)}</h2>
      <p class="price">${formatEuro(product.priceCents)} · Namensgravur gratis</p>
      <p class="muted">${escapeHtml(product.blurb)}</p>
      ${
        product.presets.length
          ? `<div class="presets">${product.presets
              .map((preset) => `<button type="button" data-preset="${escapeHtml(preset)}">${escapeHtml(preset)}</button>`)
              .join("")}</div>`
          : ""
      }
      <form data-add="${product.id}">
        <label class="field"><span>Gravurtext — ${escapeHtml(product.engravingHint)}</span>
          <textarea name="engraving" maxlength="80" placeholder="Name oder Spruch"></textarea>
        </label>
        ${option}
        <div class="row">
          <div class="qty" data-qty>
            <button type="button" data-step="-1" aria-label="Weniger">−</button>
            <input name="qty" type="number" min="1" max="99" value="1" />
            <button type="button" data-step="1" aria-label="Mehr">+</button>
          </div>
          <button class="btn" type="submit">In den Korb</button>
        </div>
      </form>
    </aside>
  `;
}

function cartDrawer(): string {
  const totals = cartTotals(state.cart);
  const untilFree = unitsUntilNextFree(totals.itemCount);
  const lines =
    totals.lines.length === 0
      ? `<p class="empty">Noch nichts im Korb.</p>`
      : totals.lines
          .map((line) => {
            const extra = optionLabel(line.product, line.optionValue);
            return `
              <article class="cart-line" data-line="${line.id}">
                <img src="${assetUrl(line.product.image)}" alt="" />
                <div>
                  <strong>${escapeHtml(line.product.name)}</strong>
                  ${extra ? `<div class="muted">${escapeHtml(extra)}</div>` : ""}
                  <label class="field"><span>Gravur</span>
                    <input data-engrave="${line.id}" value="${escapeHtml(line.engraving)}" maxlength="80" />
                  </label>
                  <div class="row">
                    <div class="qty">
                      <button type="button" data-qty-line="${line.id}" data-step="-1" aria-label="Weniger">−</button>
                      <input value="${line.qty}" readonly aria-label="Menge" />
                      <button type="button" data-qty-line="${line.id}" data-step="1" aria-label="Mehr">+</button>
                    </div>
                    <span class="price">${formatEuro(line.lineSubtotalCents)}</span>
                    <button class="btn ghost" type="button" data-remove="${line.id}">Weg</button>
                  </div>
                </div>
              </article>
            `;
          })
          .join("");

  return `
    <button class="scrim" type="button" data-go="/" aria-label="Schließen"></button>
    <aside class="drawer drawer-cart" role="dialog" aria-modal="true" aria-labelledby="c-title">
      <h2 id="c-title">Korb</h2>
      <p class="rule">4+1 gratis auf alles, auch im Mix: ab fünf Artikeln ist jeder fünfte frei — wir nehmen immer den günstigsten. Fünf Anhänger à 5&nbsp;€ werden so zu 20&nbsp;€.</p>
      ${lines}
      ${
        totals.itemCount
          ? `<div class="totals">
              <div><span>Zwischensumme</span><span>${formatEuro(totals.subtotalCents)}</span></div>
              <div><span>4+1${totals.freeCount ? ` (${totals.freeCount}× gratis)` : ""}</span><span>− ${formatEuro(totals.discountCents)}</span></div>
              <div class="sum"><span>Summe</span><span>${formatEuro(totals.totalCents)}</span></div>
              <p class="muted">${totals.freeCount ? "Aktion ist eingerechnet." : `Noch ${untilFree} Stück bis zum nächsten Gratisartikel.`}</p>
              <button class="btn wide" type="button" data-go="kasse">Weiter zur Vormerkung</button>
            </div>`
          : `<button class="btn wide" type="button" data-go="/">Zur Auswahl</button>`
      }
    </aside>
  `;
}

export function render(): void {
  if (!root) return;
  const main =
    state.view === "checkout" ? checkoutView() : state.view === "done" ? doneView() : shopView();
  const overlay =
    state.view === "shop" && state.drawer?.kind === "product"
      ? productDrawer(state.drawer.id)
      : state.view === "shop" && state.drawer?.kind === "cart"
        ? cartDrawer()
        : "";
  root.innerHTML = `${header()}${main}${overlay}${state.toast ? `<div class="toast" role="status">${escapeHtml(state.toast)}</div>` : ""}`;
}

function onClick(event: Event): void {
  const target = (event.target as HTMLElement).closest<HTMLElement>("[data-go], [data-filter], [data-preset], [data-step], [data-qty-line], [data-remove], [data-new]");
  if (!target) return;

  if (target.dataset.new !== undefined) {
    state.cart = [];
    state.order = null;
    persist();
    go("/");
    return;
  }

  if (target.dataset.filter) {
    state.filter = target.dataset.filter as CategoryId | "alle";
    render();
    return;
  }

  if (target.dataset.preset) {
    const area = root?.querySelector<HTMLTextAreaElement>("textarea[name=engraving]");
    if (area) area.value = target.dataset.preset;
    return;
  }

  if (target.dataset.qtyLine && target.dataset.step) {
    const line = state.cart.find((entry) => entry.id === target.dataset.qtyLine);
    if (!line) return;
    state.cart = setLineQty(state.cart, line.id, line.qty + Number(target.dataset.step));
    persist();
    render();
    return;
  }

  if (target.dataset.step && target.closest("[data-qty]")) {
    const input = target.closest("[data-qty]")?.querySelector<HTMLInputElement>("input[name=qty]");
    if (!input) return;
    input.value = String(Math.max(1, Number(input.value || "1") + Number(target.dataset.step)));
    return;
  }

  if (target.dataset.remove) {
    state.cart = removeLine(state.cart, target.dataset.remove);
    persist();
    render();
    return;
  }

  if (target.dataset.go !== undefined) {
    event.preventDefault();
    go(target.dataset.go);
  }
}

function onInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  const lineId = input.dataset.engrave;
  if (!lineId) return;
  state.cart = setLineEngraving(state.cart, lineId, input.value);
  persist();
}

function onSubmit(event: Event): void {
  const form = event.target as HTMLFormElement;
  if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault();

  if (form.dataset.add) {
    const product = productById(form.dataset.add);
    if (!product) return;
    const data = new FormData(form);
    const qty = Number(data.get("qty") || 1);
    const engraving = String(data.get("engraving") ?? "");
    const optionRaw = data.get("option");
    const add: { productId: string; qty: number; engraving: string; optionValue?: string } = {
      productId: product.id,
      qty,
      engraving,
    };
    if (typeof optionRaw === "string" && optionRaw) add.optionValue = optionRaw;
    state.cart = addLine(state.cart, add);
    persist();
    toast("Liegt im Korb.");
    go("korb");
    return;
  }

  if (form.dataset.checkout !== undefined) {
    const data = new FormData(form);
    const totals = cartTotals(state.cart);
    if (totals.itemCount === 0) return;
    const stamp = new Date();
    const code = `DRE-${stamp.getFullYear()}${String(stamp.getMonth() + 1).padStart(2, "0")}${String(stamp.getDate()).padStart(2, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    state.order = {
      code,
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      note: String(data.get("note") ?? "").trim(),
      lines: state.cart,
      totalCents: totals.totalCents,
      discountCents: totals.discountCents,
      itemCount: totals.itemCount,
    };
    state.cart = [];
    persist();
    go("vorgemerkt");
  }
}

export function mount(el: Element): void {
  root = el;
  el.addEventListener("click", onClick);
  el.addEventListener("input", onInput);
  el.addEventListener("submit", onSubmit);
  window.addEventListener("hashchange", () => {
    openHash();
    render();
    window.scrollTo(0, 0);
  });
  openHash();
  render();
}
