import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCheckout } from "../context/CheckoutContext";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const { payment, setPayment, shipping, completeOrder } = useCheckout();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  if (items.length === 0 || !shipping.name) {
    return (
      <div className="checkout-page">
        <div className="wrap empty-state">
          <p className="display-3" style={{ fontSize: 20 }}>Let's back up a step</p>
          <p className="body">We need a shipping address before payment.</p>
          <Link to="/checkout/shipping" className="btn btn-primary">Go to shipping</Link>
        </div>
      </div>
    );
  }

  function update(field, value) {
    setPayment({ ...payment, [field]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!payment.cardName.trim()) nextErrors.cardName = "Required";
    if (!/^\d{13,19}$/.test(payment.cardNumber.replace(/\s/g, ""))) nextErrors.cardNumber = "Enter a valid card number";
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) nextErrors.expiry = "Use MM/YY";
    if (!/^\d{3,4}$/.test(payment.cvc)) nextErrors.cvc = "3 or 4 digits";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      completeOrder();
      clearCart();
      navigate("/checkout/confirmation");
    }
  }

  const shippingCost = subtotal >= 150 ? 0 : 12;

  return (
    <div className="checkout-page">
      <div className="wrap">
        <CheckoutSteps current="payment" />
        <h1 className="display-2" style={{ fontSize: 30, marginBottom: 10 }}>
          Payment details
        </h1>
        <p className="body" style={{ color: "var(--text-on-light-dim)", marginBottom: 28 }}>
          This is a prototype — no real payment is processed. Any card-shaped input works.
        </p>

        <div className="checkout-split">
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <Field label="Name on card" value={payment.cardName} error={errors.cardName} onChange={(v) => update("cardName", v)} full />
              <Field label="Card number" value={payment.cardNumber} error={errors.cardNumber} onChange={(v) => update("cardNumber", v)} full placeholder="4242 4242 4242 4242" />
              <Field label="Expiry (MM/YY)" value={payment.expiry} error={errors.expiry} onChange={(v) => update("expiry", v)} placeholder="08/28" />
              <Field
                label="CVC"
                value={payment.cvc}
                error={errors.cvc}
                onChange={(v) => update("cvc", v)}
                placeholder="123"
                hint="3 digits on the back of your card, or 4 on the front for Amex."
              />
            </div>

            <div className="form-actions">
              <Link to="/checkout/shipping" className="btn btn-outline-light">← Back to shipping</Link>
              <button type="submit" className="btn btn-primary">Place order</button>
            </div>
          </form>

          <aside className="cart-summary">
            <p className="mono" style={{ marginBottom: 12, color: "var(--text-on-light-dim)" }}>Order summary</p>
            {items.map((item) => (
              <div className="cart-summary__row" key={item.lineId} style={{ fontSize: 13.5 }}>
                <span>{item.name} × {item.qty}</span>
                <span className="mono">${item.price * item.qty}</span>
              </div>
            ))}
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span className="mono">{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span>
            </div>
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span className="mono">${subtotal + shippingCost}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, placeholder, full = false, hint }) {
  const [hintOpen, setHintOpen] = useState(false);
  return (
    <label className={`field ${full ? "field--full" : ""}`}>
      <span className="field__label-row">
        <span className="mono field__label">{label}</span>
        {hint && (
          <button
            type="button"
            className="field__hint-toggle"
            aria-expanded={hintOpen}
            aria-label={`What's this? ${label}`}
            onClick={(e) => {
              e.preventDefault();
              setHintOpen((v) => !v);
            }}
          >
            ?
          </button>
        )}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={error ? "field__input field__input--error" : "field__input"}
      />
      {hint && hintOpen && <span className="field__hint">{hint}</span>}
      {error && <span className="form-error" role="alert">{error}</span>}
    </label>
  );
}
