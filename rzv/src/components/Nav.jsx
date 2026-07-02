import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const LINKS = [
  { to: "/", label: "Home", match: (loc) => loc.pathname === "/" },
  {
    to: "/shop",
    label: "Shop",
    // "Shop" is only the active tab when there's no activity filter set —
    // otherwise it would light up alongside Alpine/Trail for every /shop URL.
    match: (loc) => loc.pathname === "/shop" && !new URLSearchParams(loc.search).getAll("activity").length,
  },
  {
    to: "/shop?activity=Alpine",
    label: "Alpine",
    match: (loc) => loc.pathname === "/shop" && new URLSearchParams(loc.search).getAll("activity").includes("Alpine"),
  },
  {
    to: "/shop?activity=Trail",
    label: "Trail",
    match: (loc) => loc.pathname === "/shop" && new URLSearchParams(loc.search).getAll("activity").includes("Trail"),
  },
  { to: "/survey", label: "Feedback", match: (loc) => loc.pathname === "/survey" },
];

export default function Nav() {
  const { count } = useCart();
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="promo-strip">
        <div className="wrap promo-strip__inner">
          <span>Free shipping on orders over $150 — the Alpine collection is live now.</span>
          <Link to="/shop?activity=Alpine" className="promo-strip__link">
            Shop Alpine →
          </Link>
        </div>
      </div>

      <div className="nav">
        <div className="wrap nav__inner">
          <Link to="/" className="nav__mark" aria-label="RZV home">
            <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
              <path
                d="M8 44 L24 16 L32 30 L40 12 L56 44"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <span>RZV</span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`nav__link ${link.match(location) ? "active" : ""}`}
                aria-current={link.match(location) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link to="/cart" className="nav__cart" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
            <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span className="mono">({count})</span>
          </Link>
        </div>
      </div>
    </header>
  );
}