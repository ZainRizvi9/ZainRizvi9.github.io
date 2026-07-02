import { Link } from "react-router-dom";
import GarmentIcon from "./GarmentIcon";
import { COLORS } from "../data/products";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="pcard">
      <div
        className="pcard__swatch"
        style={{ background: `linear-gradient(160deg, ${COLORS[product.color]}, ${shade(COLORS[product.color])})` }}
      >
        <div className="contour-field" />
        {product.tag && <span className="pcard__tag mono">{product.tag}</span>}
        <GarmentIcon type={product.icon} size={64} className="pcard__icon" />
      </div>
      <div className="pcard__info">
        <div className="pcard__row">
          <span className="pcard__name">{product.name}</span>
          <span className="pcard__price mono">${product.price}</span>
        </div>
        <div className="pcard__meta mono">
          {product.color} · {product.material}
        </div>
      </div>
    </Link>
  );
}

// Darken a hex color slightly for a subtle gradient on the swatch
function shade(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 255) - 30);
  const g = Math.max(0, ((n >> 8) & 255) - 30);
  const b = Math.max(0, (n & 255) - 30);
  return `rgb(${r}, ${g}, ${b})`;
}
