import { Link, useNavigate } from "react-router-dom";
import GarmentIcon from "../components/GarmentIcon";
import { COLORS } from "../data/products";
import { useCart } from "../context/CartContext";
import CheckoutSteps from "../components/CheckoutSteps";

export default function Cart() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="checkout-page">
      <div className="wrap">
        <CheckoutSteps current="cart" />

        <h1 className="display-2" style={{ fontSize: 30, marginBottom: 28 }}>
          Your cart
        </h1>

        {items.length === 0 ? (
          <div className="empty-state">
            <p className="display-3" style={{ fontSize: 20 }}>
              Your cart is empty
            </p>
            <p className="body">Nothing packed yet — go find something worth carrying.</p>
            <Link to="/shop" className="btn btn-primary">
              Shop the collection
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.lineId} className="cart-row">
                  <div
                    className="cart-row__swatch"
                    style={{ background: COLORS[item.color] }}
                  >
                    <GarmentIcon type={item.icon} size={34} />
                  </div>
                  <div className="cart-row__info">
                    <span className="cart-row__name">{item.name}</span>
                    <span className="mono cart-row__meta">
                      {item.color} · Size {item.size}
                    </span>
                  </div>
                  <div className="qty-stepper">
                    <button aria-label={`Decrease quantity of ${item.name}`} onClick={() => updateQty(item.lineId, item.qty - 1)}>
                      −
                    </button>
                    <span className="mono" aria-live="polite">{item.qty}</span>
                    <button aria-label={`Increase quantity of ${item.name}`} onClick={() => updateQty(item.lineId, item.qty + 1)}>
                      +
                    </button>
                  </div>
                  <span className="mono cart-row__price">${item.price * item.qty}</span>
                  <button
                    className="cart-row__remove"
                    onClick={() => removeItem(item.lineId)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <aside className="cart-summary">
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span className="mono">${subtotal}</span>
              </div>
              <div className="cart-summary__row">
                <span>Shipping</span>
                <span className="mono">{subtotal >= 150 ? "Free" : "$12"}</span>
              </div>
              <div className="cart-summary__row cart-summary__row--total">
                <span>Total</span>
                <span className="mono">${subtotal >= 150 ? subtotal : subtotal + 12}</span>
              </div>
              {subtotal < 150 && (
                <p className="cart-summary__note">
                  Add ${150 - subtotal} more for free shipping.
                </p>
              )}
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => navigate("/checkout/shipping")}>
                Continue to shipping
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
