import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <div className="display-3" style={{ fontSize: 22 }}>
            RZV
          </div>
          <p className="footer__tag">Built for the terrain between the trailhead and the summit.</p>
        </div>

        <div className="footer__col">
          <div className="eyebrow footer__heading">Shop</div>
          <ul>
            <li><Link to="/shop?category=Jackets">Jackets</Link></li>
            <li><Link to="/shop?category=Pants">Pants</Link></li>
            <li><Link to="/shop?category=Packs">Packs</Link></li>
            <li><Link to="/shop?category=Accessories">Accessories</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <div className="eyebrow footer__heading">Company</div>
          <ul>
            <li><Link to="/survey">Give feedback</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <div className="eyebrow footer__heading">Field notes</div>
          <p className="footer__note">
            Free shipping on orders over $150. Returns accepted within 30 days, worn or not.
          </p>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <span className="mono">© {new Date().getFullYear()} RZV — Prototype for SEG3125</span>
      </div>
    </footer>
  );
}
