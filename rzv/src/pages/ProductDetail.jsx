import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import GarmentIcon from "../components/GarmentIcon";
import ProductCard from "../components/ProductCard";
import { getProduct, PRODUCTS, COLORS, getSizeGuide } from "../data/products";
import { useCart } from "../context/CartContext";

function shade(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 255) - 30);
  const g = Math.max(0, ((n >> 8) & 255) - 30);
  const b = Math.max(0, (n & 255) - 30);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addItem } = useCart();
  const [size, setSize] = useState(null);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  if (!product) {
    return (
      <div className="wrap detail-notfound">
        <p className="display-3">Product not found</p>
        <Link to="/shop" className="btn btn-outline-light">
          Back to shop
        </Link>
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const sizeGuide = getSizeGuide(product.sizes);

  function handleAdd() {
    if (!size) {
      setError("Pick a size before adding to cart.");
      return;
    }
    setError("");
    addItem(product, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="detail">
      <div className="wrap detail__grid">
        <div
          className="detail__swatch"
          style={{ background: `linear-gradient(160deg, ${COLORS[product.color]}, ${shade(COLORS[product.color])})` }}
        >
          <div className="contour-field" />
          {product.tag && <span className="pcard__tag mono">{product.tag}</span>}
          <GarmentIcon type={product.icon} size={140} className="detail__icon" />
        </div>

        <div className="detail__info">
          <p className="eyebrow" style={{ color: "var(--text-on-light-dim)" }}>
            {product.activity} / {product.category}
          </p>
          <h1 className="display-2" style={{ fontSize: 32 }}>
            {product.name}
          </h1>
          <p className="detail__price mono">${product.price}</p>
          <p className="body-lg detail__blurb">{product.blurb}</p>

          <div className="detail__field">
            <span className="mono detail__label">Color</span>
            <span>{product.color}</span>
          </div>

          <div className="detail__field detail__field--sizes">
            <span className="mono detail__label">Size</span>
            <div className="detail__size-col">
              <div className="size-grid">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-opt ${size === s ? "size-opt--active" : ""}`}
                    onClick={() => {
                      setSize(s);
                      setError("");
                    }}
                    aria-pressed={size === s}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {sizeGuide && (
                <div className="size-guide">
                  <button
                    type="button"
                    className="size-guide__toggle"
                    onClick={() => setGuideOpen((v) => !v)}
                    aria-expanded={guideOpen}
                  >
                    Size guide {guideOpen ? "▲" : "▼"}
                  </button>
                  {guideOpen && (
                    <table className="size-guide__table">
                      <caption className="sr-only">Size chart, {sizeGuide.label}</caption>
                      <thead>
                        <tr>
                          <th scope="col">Size</th>
                          <th scope="col">{sizeGuide.label}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeGuide.rows.map(([label, range]) => (
                          <tr key={label}>
                            <th scope="row">{label}</th>
                            <td>{range}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="detail__actions">
            <button className="btn btn-primary" onClick={handleAdd}>
              Add to cart
            </button>
            {added && (
              <span className="detail__added mono" role="status">
                Added — <Link to="/cart">view cart →</Link>
              </span>
            )}
          </div>

          <div className="detail__specs">
            <span className="mono detail__label">Specs</span>
            <ul>
              {product.specs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="wrap detail__related">
          <p className="eyebrow" style={{ color: "var(--text-on-light-dim)", marginBottom: 20 }}>
            More {product.category.toLowerCase()}
          </p>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
