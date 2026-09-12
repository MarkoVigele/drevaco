# DREVACO

Personalisierte Holz- und Ledergravur — so wie am Marktstand. Deutscher Demo-Shop im Look von [drevaco.sk](https://drevaco.sk/home.html): dunkler Header, Goldakzente, weiße Flächen. Schlüsselbretter, Kochlöffel, kleine Bretter, Holz-Bierkrüge und Anhänger. Namensgravur ist im Preis. Der Name der Marke steht auf dem Holzdisk: **drevaco.sk**.

**Live:** [https://markovigele.github.io/drevaco/](https://markovigele.github.io/drevaco/)

Deutscher Demo-Shop. Korb und Gravurtext funktionieren. Es gibt keine Zahlung und kein Stripe — am Ende steht nur **Bestellung vorgemerkt**, lokal im Browser.

## Aktionen

- **Kostenlose Namensgravur** auf alle Artikel.
- **4+1 gratis auf alles, auch im Mix.** Ab fünf Stück ist jeder fünfte Artikel frei. Wir nehmen immer den günstigsten. Zehn Stück → zwei Gratisartikel.
- Schlüsselanhänger 5 €, fünf Stück damit **20 €** (dasselbe Rechenregel).

## Katalog (Standpreise)

| Artikel | Preis |
| --- | ---: |
| Schlüsselbrett Hausform | 10 € |
| Kochlöffel / Pfannenwender | 3 € |
| Kleines Holzbrett | 5 € |
| Holz-Bierkrug (Edelstahl innen) | 25 €, Gravur inkl. |
| Bierkrug-Brett (Silhouette) | 10 € |
| Schlüsselanhänger Holzherz / Lederband | 5 €, 5 Stück 20 € |

Produktkarten zeigen zugeschnittene Einzelstücke (ein Brett, ein Löffel, ein Krug, …). Hero und Übersicht bleiben Gruppenfotos. Das Logo ist der gravierte Holzdisk.

## Lokal

Voraussetzung: Node 22.

```bash
npm install
npm test
npm run dev
```

Dev-URL unter `/drevaco/` (gleicher Base-Pfad wie GitHub Pages):

`http://localhost:5173/drevaco/`

Produktion lokal:

```bash
npm run build
npm run preview
```

Dann: `http://localhost:4173/drevaco/`

## GitHub Pages

Vite `base` ist `/drevaco/`. Der Workflow `.github/workflows/pages.yml` deployt bei Push auf `main` (und per `workflow_dispatch`).

Nach dem Merge:

1. Actions → **Deploy GitHub Pages** einmal grün.
2. Settings → Pages: Quelle **GitHub Actions**.
3. Öffnen: https://markovigele.github.io/drevaco/

## Team

Nüchtern, klein, aus Österreich. INGENIUMOWL.
