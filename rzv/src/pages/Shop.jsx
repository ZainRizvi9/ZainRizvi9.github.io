import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, FACET_CONFIG, getFacetOptions, COLORS } from "../data/products";

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const query = params.get("q") || "";

  function setQuery(value) {
    const next = new URLSearchParams(params);
    if (value) next.set("q", value);
    else next.delete("q");
    setParams(next, { replace: true });
  }

  // Read active facet selections straight from the URL so filters are shareable / bookmarkable
  const active = useMemo(() => {
    const out = {};
    FACET_CONFIG.forEach(({ key }) => {
      out[key] = params.getAll(key);
    });
    return out;
  }, [params]);

  const activeCount = Object.values(active).reduce((n, arr) => n + arr.length, 0);

  function toggleFacet(key, value) {
    const next = new URLSearchParams(params);
    const current = next.getAll(key);
    next.delete(key);
    if (current.includes(value)) {
      current.filter((v) => v !== value).forEach((v) => next.append(key, v));
    } else {
      [...current, value].forEach((v) => next.append(key, v));
    }
    setParams(next, { replace: true });
  }

  function clearAll() {
    setParams(new URLSearchParams(), { replace: true });
  }

  function clearSearch() {
    setQuery("");
  }

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      FACET_CONFIG.every(({ key }) => active[key].length === 0 || active[key].includes(p[key]))
    );

    const q = query.trim().toLowerCase();
    if (q) {
      const words = q.split(/\s+/);
      list = list.filter((p) => {
        const haystack = `${p.name} ${p.category} ${p.activity} ${p.material} ${p.color}`.toLowerCase();
        // Every word in the query has to show up somewhere in the product's
        // fields — checked as-is and with a trailing "s" trimmed, so
        // "jackets" still matches a category of "Jackets" and a product
        // named "Verglas Shell Jacket" either way.
        return words.every((word) => haystack.includes(word) || haystack.includes(word.replace(/s$/, "")));
      });
    }

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [active, sort, query]);

  return (
    <div className="shop">
      <div className="wrap shop__head">
        <div>
          <p className="eyebrow">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
            {query && <> for "{query}"</>}
          </p>
          <h1 className="display-2" style={{ fontSize: 34 }}>
            Shop RZV
          </h1>
        </div>
        <label className="shop__sort">
          <span className="mono">Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
      </div>

      <div className="wrap shop__layout">
        <aside className="facets" aria-label="Filter products">
          <div className="facets__head">
            <span className="eyebrow">Filter</span>
            {activeCount > 0 && (
              <button className="btn-ghost btn" onClick={clearAll} style={{ padding: 0, fontSize: 12 }}>
                Clear all ({activeCount})
              </button>
            )}
          </div>

          {FACET_CONFIG.map(({ key, label }) => (
            <fieldset className="facet-group" key={key}>
              <legend className="mono facet-group__legend">{label}</legend>
              {getFacetOptions(PRODUCTS, key).map((option) => {
                const count = PRODUCTS.filter(
                  (p) =>
                    p[key] === option &&
                    FACET_CONFIG.every(
                      ({ key: k }) => k === key || active[k].length === 0 || active[k].includes(p[k])
                    )
                ).length;
                const checked = active[key].includes(option);
                return (
                  <label className={`facet-opt ${count === 0 && !checked ? "facet-opt--empty" : ""}`} key={option}>
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={count === 0 && !checked}
                      onChange={() => toggleFacet(key, option)}
                    />
                    {key === "color" && (
                      <span className="facet-opt__swatch" style={{ background: COLORS[option] }} aria-hidden="true" />
                    )}
                    <span>{option}</span>
                    <span className="mono facet-opt__count">{count}</span>
                  </label>
                );
              })}
            </fieldset>
          ))}
        </aside>

        <div className="shop__results">
          {(activeCount > 0 || query) && (
            <div className="chip-row">
              {query && (
                <button className="chip" onClick={clearSearch}>
                  "{query}" <span aria-hidden="true">×</span>
                </button>
              )}
              {FACET_CONFIG.flatMap(({ key }) =>
                active[key].map((val) => (
                  <button key={`${key}-${val}`} className="chip" onClick={() => toggleFacet(key, val)}>
                    {key === "color" && (
                      <span className="chip__swatch" style={{ background: COLORS[val] }} aria-hidden="true" />
                    )}
                    {val} <span aria-hidden="true">×</span>
                  </button>
                ))
              )}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="empty-state">
              <p className="display-3" style={{ fontSize: 20 }}>
                {query ? `Nothing matches "${query}"` : "No products match those filters"}
              </p>
              <p className="body">
                {query
                  ? "Try a different word, or clear the search to see everything."
                  : "Try clearing a filter — the terrain gets wider from here."}
              </p>
              <button className="btn btn-outline-light" onClick={clearAll}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}