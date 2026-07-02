# RZV — Technical Apparel (SEG3125 Assignment 4)

## Run locally
```
npm install
npm run dev
```

## Build for GitHub Pages
```
npm run build
```
This outputs to `dist/`. Copy the contents of `dist/` into the root of your `rzv`
GitHub Pages repo (same approach used for ReelRecall), commit, and push.
`vite.config.js` is already set with `base: '/rzv/'` — update that if your repo
name is different.

## What's built so far
- Home — hero, category rail, editorial block, featured products, survey teaser
- Shop — faceted search (Activity / Category / Color / Material), sort, URL-synced filters
- Product detail — size selection, add to cart, specs, related products
- Cart → Shipping → Payment → Confirmation — the "follow instructions" buy flow with a
  progress stepper
- Survey — the "communicate" process, post-visit feedback

## Not yet built
- Heuristic evaluation write-up
- Portfolio link-back
- Report PDF
