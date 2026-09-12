import {
  assetUrl,
  CATEGORY_IDS,
  productById,
  productsInCategory,
  type CategoryId,
  type LeatherColorId,
  type Product,
} from "./catalog";
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
import { copy, getLocale, initLocale, interpolate, isLocale, productCopy, setLocale } from "./i18n";
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
let pendingScroll: string | null = null;

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
  const labels = copy().options[product.option.id].values;
  if (value in labels) return labels[value as LeatherColorId];
  return value;
}

function euro(cents: number): string {
  return formatEuro(cents, getLocale());
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function languageSwitcher(): string {
  const m = copy();
  const current = getLocale();
  return `
    <nav class="langs" role="group" aria-label="${escapeHtml(m.lang.group)}">
      ${(["sk", "en", "de"] as const)
        .map(
          (code) => `
        <button type="button" data-lang="${code}" lang="${code}" aria-pressed="${current === code}" aria-label="${escapeHtml(m.lang[code])}">${code.toUpperCase()}</button>
      `,
        )
        .join("")}
    </nav>
  `;
}

function header(): string {
  const m = copy();
  const count = cartItemCount(state.cart);
  const cartLabel = count ? interpolate(m.cartAriaCount, { count }) : m.cartAria;
  return `
    <a class="skip" href="#auswahl">${escapeHtml(m.skip)}</a>
    <header class="top">
      <a class="brand" href="#/" data-go="/">
        <img src="${assetUrl("logo-mark.png")}" alt="" width="40" height="40" />
        <span class="brand-name">DREVACO</span>
      </a>
      <nav class="nav" aria-label="${escapeHtml(m.nav.shop)}">
        ${languageSwitcher()}
        <button class="nav-link" type="button" data-scroll="auswahl">${escapeHtml(m.nav.items)}</button>
        <button class="nav-link" type="button" data-scroll="aktionen">${escapeHtml(m.nav.offers)}</button>
        <button class="icon-btn" type="button" data-go="korb" ${count ? `data-count="${count}"` : ""} aria-label="${escapeHtml(cartLabel)}">${escapeHtml(m.cart)}</button>
      </nav>
    </header>
  `;
}

function footer(): string {
  const m = copy();
  return `
    <footer class="foot">
      <div class="wrap">
        <div class="brand-name">DREVACO</div>
        <p>${escapeHtml(m.footerLine1)}</p>
        <p>${escapeHtml(m.footerLine2)}</p>
        <p>INGENIUMOWL</p>
      </div>
    </footer>
  `;
}

function shopView(): string {
  const m = copy();
  const list = productsInCategory(state.filter);
  return `
    <main id="inhalt">
      <section class="hero">
        <div class="hero-visual">
          <img src="${assetUrl("hero-stand.jpg")}" alt="${escapeHtml(m.hero.imageAlt)}" />
        </div>
        <div class="hero-copy">
          <p class="eyebrow">drevaco.sk</p>
          <h1>${escapeHtml(m.hero.title)}</h1>
          <p>${escapeHtml(m.hero.body)}</p>
          <div class="hero-actions">
            <button class="btn" type="button" data-scroll="auswahl">${escapeHtml(m.hero.toShop)}</button>
            <button class="btn ghost" type="button" data-scroll="aktionen">${escapeHtml(m.hero.offerCta)}</button>
          </div>
        </div>
      </section>
      <section class="section tint" id="aktionen" aria-label="${escapeHtml(m.promo.region)}">
        <div class="wrap">
          <h2 class="section-title">${escapeHtml(m.offersTitle)}</h2>
          <div class="promo-grid">
            <article class="promo-card">
              <h3>${escapeHtml(m.promo.engravingTitle)}</h3>
              <p>${escapeHtml(m.promo.engravingBody)}</p>
            </article>
            <article class="promo-card">
              <h3>${escapeHtml(m.promo.fourTitle)}</h3>
              <p>${escapeHtml(m.promo.fourBody)}</p>
            </article>
            <article class="promo-card">
              <h3>${escapeHtml(m.promo.pendantsTitle)}</h3>
              <p>${escapeHtml(m.promo.pendantsBody)}</p>
            </article>
          </div>
        </div>
      </section>
      <section class="section" id="auswahl">
        <div class="wrap">
          <h2 class="section-title">${escapeHtml(m.catalogTitle)}</h2>
          <div class="filters" role="tablist" aria-label="${escapeHtml(m.filters)}">
            ${CATEGORY_IDS.map(
              (id) => `
              <button class="filter" type="button" role="tab" data-filter="${id}" aria-pressed="${state.filter === id}">${escapeHtml(m.category[id])}</button>
            `,
            ).join("")}
          </div>
          <div class="grid" aria-live="polite">
            ${list
              .map((product) => {
                const text = productCopy(product.id);
                const badge = product.badge ? `<span class="badge">${escapeHtml(m.badge[product.badge])}</span>` : "";
                return `
              <button class="card" type="button" data-go="p/${product.id}">
                <img src="${assetUrl(product.image)}" alt="" />
                <div class="card-body">
                  ${badge}
                  <h2>${escapeHtml(text.name)}</h2>
                  <div class="price">${euro(product.priceCents)}</div>
                </div>
              </button>
            `;
              })
              .join("")}
          </div>
        </div>
      </section>
    </main>
    ${footer()}
  `;
}

function checkoutView(): string {
  const m = copy();
  const totals = cartTotals(state.cart);
  if (totals.itemCount === 0) {
    return `
      <main id="inhalt" class="wrap page">
        <h1>${escapeHtml(m.checkout)}</h1>
        <p class="empty">${escapeHtml(m.checkoutEmpty)}</p>
        <button class="btn" type="button" data-go="/">${escapeHtml(m.backToShop)}</button>
      </main>
      ${footer()}
    `;
  }
  const summary = `${interpolate(m.checkoutSummary, { count: totals.itemCount, total: euro(totals.totalCents) })}${
    totals.freeCount ? interpolate(m.checkoutSummaryFree, { count: totals.freeCount }) : ""
  }`;
  return `
    <main id="inhalt" class="wrap page">
      <h1>${escapeHtml(m.checkoutTitle)}</h1>
      <p class="muted">${escapeHtml(m.checkoutIntro)}</p>
      <p class="rule">${escapeHtml(summary)}</p>
      <form class="form-grid" data-checkout>
        <label class="field"><span>${escapeHtml(m.fieldName)}</span><input name="name" required autocomplete="name" /></label>
        <label class="field"><span>${escapeHtml(m.fieldEmail)}</span><input name="email" type="email" required autocomplete="email" /></label>
        <label class="field"><span>${escapeHtml(m.fieldPhone)}</span><input name="phone" type="tel" autocomplete="tel" /></label>
        <label class="field"><span>${escapeHtml(m.fieldNote)}</span><textarea name="note" placeholder="${escapeHtml(m.notePlaceholder)}"></textarea></label>
        <button class="btn wide" type="submit">${escapeHtml(m.submitReserve)}</button>
        <button class="btn ghost wide" type="button" data-go="korb">${escapeHtml(m.backToCart)}</button>
      </form>
    </main>
    ${footer()}
  `;
}

function doneView(): string {
  const m = copy();
  const order = state.order;
  if (!order) {
    return `
      <main id="inhalt" class="wrap page">
        <h1>${escapeHtml(m.noOrderTitle)}</h1>
        <p class="muted">${escapeHtml(m.noOrderBody)}</p>
        <button class="btn" type="button" data-go="/">${escapeHtml(m.backToShop)}</button>
      </main>
      ${footer()}
    `;
  }
  const summary = `${interpolate(m.doneSummary, { count: order.itemCount, total: euro(order.totalCents) })}${
    order.discountCents ? interpolate(m.doneDiscount, { amount: euro(order.discountCents) }) : ""
  }`;
  return `
    <main id="inhalt" class="wrap done">
      <img src="${assetUrl("logo-disk.jpg")}" alt="" />
      <h1>${escapeHtml(m.doneTitle)}</h1>
      <p class="muted">${interpolate(m.doneBody, { code: `<strong>${escapeHtml(order.code)}</strong>` })}</p>
      <div class="order-box">
        <p><strong>${escapeHtml(order.name)}</strong><br />${escapeHtml(order.email)}${order.phone ? `<br />${escapeHtml(order.phone)}` : ""}</p>
        <ul>
          ${order.lines
            .map((line) => {
              const product = productById(line.productId);
              if (!product) return "";
              const extra = optionLabel(product, line.optionValue);
              return `<li>${line.qty}× ${escapeHtml(productCopy(product.id).name)}${extra ? ` · ${escapeHtml(extra)}` : ""}${line.engraving ? ` — „${escapeHtml(line.engraving)}“` : ""}</li>`;
            })
            .join("")}
        </ul>
        <p>${escapeHtml(summary)}</p>
        ${order.note ? `<p class="muted">${escapeHtml(order.note)}</p>` : ""}
      </div>
      <p><button class="btn" type="button" data-new>${escapeHtml(m.newSelection)}</button></p>
    </main>
    ${footer()}
  `;
}

function productDrawer(id: string): string {
  const product = productById(id);
  if (!product) return "";
  const m = copy();
  const text = productCopy(product.id);
  const option = product.option
    ? `<label class="field"><span>${escapeHtml(m.options[product.option.id].label)}</span>
        <select name="option">${product.option.values
          .map(
            (value) =>
              `<option value="${value.id}">${escapeHtml(m.options[product.option!.id].values[value.id])}</option>`,
          )
          .join("")}</select>
      </label>`
    : "";
  return `
    <button class="scrim" type="button" data-go="/" aria-label="${escapeHtml(m.close)}"></button>
    <aside class="drawer drawer-product" role="dialog" aria-modal="true" aria-labelledby="p-title">
      <img class="hero-img" src="${assetUrl(product.image)}" alt="" />
      <h2 id="p-title">${escapeHtml(text.name)}</h2>
      <p class="price">${euro(product.priceCents)} · ${escapeHtml(m.engravingFree)}</p>
      <p class="muted">${escapeHtml(text.blurb)}</p>
      ${
        text.presets.length
          ? `<div class="presets">${text.presets
              .map((preset) => `<button type="button" data-preset="${escapeHtml(preset)}">${escapeHtml(preset)}</button>`)
              .join("")}</div>`
          : ""
      }
      <form data-add="${product.id}">
        <label class="field"><span>${escapeHtml(interpolate(m.engravingLabel, { hint: text.engravingHint }))}</span>
          <textarea name="engraving" maxlength="80" placeholder="${escapeHtml(m.engravingPlaceholder)}"></textarea>
        </label>
        ${option}
        <div class="row">
          <div class="qty" data-qty>
            <button type="button" data-step="-1" aria-label="${escapeHtml(m.qtyLess)}">−</button>
            <input name="qty" type="number" min="1" max="99" value="1" />
            <button type="button" data-step="1" aria-label="${escapeHtml(m.qtyMore)}">+</button>
          </div>
          <button class="btn" type="submit">${escapeHtml(m.addToCart)}</button>
        </div>
      </form>
    </aside>
  `;
}

function cartDrawer(): string {
  const m = copy();
  const totals = cartTotals(state.cart);
  const untilFree = unitsUntilNextFree(totals.itemCount);
  const lines =
    totals.lines.length === 0
      ? `<p class="empty">${escapeHtml(m.cartEmpty)}</p>`
      : totals.lines
          .map((line) => {
            const extra = optionLabel(line.product, line.optionValue);
            return `
              <article class="cart-line" data-line="${line.id}">
                <img src="${assetUrl(line.product.image)}" alt="" />
                <div>
                  <strong>${escapeHtml(productCopy(line.product.id).name)}</strong>
                  ${extra ? `<div class="muted">${escapeHtml(extra)}</div>` : ""}
                  <label class="field"><span>${escapeHtml(m.engravingShort)}</span>
                    <input data-engrave="${line.id}" value="${escapeHtml(line.engraving)}" maxlength="80" />
                  </label>
                  <div class="row">
                    <div class="qty">
                      <button type="button" data-qty-line="${line.id}" data-step="-1" aria-label="${escapeHtml(m.qtyLess)}">−</button>
                      <input value="${line.qty}" readonly aria-label="${escapeHtml(m.qty)}" />
                      <button type="button" data-qty-line="${line.id}" data-step="1" aria-label="${escapeHtml(m.qtyMore)}">+</button>
                    </div>
                    <span class="price">${euro(line.lineSubtotalCents)}</span>
                    <button class="btn ghost" type="button" data-remove="${line.id}">${escapeHtml(m.remove)}</button>
                  </div>
                </div>
              </article>
            `;
          })
          .join("");

  return `
    <button class="scrim" type="button" data-go="/" aria-label="${escapeHtml(m.close)}"></button>
    <aside class="drawer drawer-cart" role="dialog" aria-modal="true" aria-labelledby="c-title">
      <h2 id="c-title">${escapeHtml(m.cartTitle)}</h2>
      <p class="rule">${escapeHtml(m.cartRule)}</p>
      ${lines}
      ${
        totals.itemCount
          ? `<div class="totals">
              <div><span>${escapeHtml(m.subtotal)}</span><span>${euro(totals.subtotalCents)}</span></div>
              <div><span>${escapeHtml(m.fourPlusOne)}${totals.freeCount ? escapeHtml(interpolate(m.fourPlusOneFree, { count: totals.freeCount })) : ""}</span><span>− ${euro(totals.discountCents)}</span></div>
              <div class="sum"><span>${escapeHtml(m.total)}</span><span>${euro(totals.totalCents)}</span></div>
              <p class="muted">${totals.freeCount ? escapeHtml(m.offerIncluded) : escapeHtml(interpolate(m.untilFree, { count: untilFree }))}</p>
              <button class="btn wide" type="button" data-go="kasse">${escapeHtml(m.continueReserve)}</button>
            </div>`
          : `<button class="btn wide" type="button" data-go="/">${escapeHtml(m.backToShop)}</button>`
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
  if (pendingScroll) {
    const target = document.getElementById(pendingScroll);
    pendingScroll = null;
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function onClick(event: Event): void {
  const target = (event.target as HTMLElement).closest<HTMLElement>(
    "[data-go], [data-filter], [data-preset], [data-step], [data-qty-line], [data-remove], [data-new], [data-scroll], [data-lang]",
  );
  if (!target) return;

  if (target.dataset.lang) {
    if (isLocale(target.dataset.lang) && target.dataset.lang !== getLocale()) {
      setLocale(target.dataset.lang);
      render();
    }
    return;
  }

  if (target.dataset.scroll) {
    const id = target.dataset.scroll;
    if (state.view !== "shop" || state.drawer) {
      pendingScroll = id;
      go("/");
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

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
    toast(copy().toastAdded);
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
  initLocale();
  el.addEventListener("click", onClick);
  el.addEventListener("input", onInput);
  el.addEventListener("submit", onSubmit);
  window.addEventListener("hashchange", () => {
    openHash();
    const scrollId = pendingScroll;
    render();
    if (!scrollId) window.scrollTo(0, 0);
  });
  openHash();
  render();
}
