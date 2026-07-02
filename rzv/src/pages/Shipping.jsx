import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCheckout } from "../context/CheckoutContext";
import { useCart } from "../context/CartContext";

export default function Shipping() {
  const { shipping, setShipping } = useCheckout();
  const { items } = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="wrap empty-state">
          <p className="display-3" style={{ fontSize: 20 }}>Your cart is empty</p>
          <p className="body">Add something to the cart before checking out.</p>
          <Link to="/shop" className="btn btn-primary">Shop the collection</Link>
        </div>
      </div>
    );
  }

  function update(field, value) {
    setShipping({ ...shipping, [field]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const required = ["name", "email", "address", "city", "postal"];
    const nextErrors = {};
    required.forEach((f) => {
      if (!shipping[f].trim()) nextErrors[f] = "Required";
    });
    if (shipping.email && !/^\S+@\S+\.\S+$/.test(shipping.email)) {
      nextErrors.email = "Enter a valid email";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      navigate("/checkout/payment");
    }
  }

  return (
    <div className="checkout-page">
      <div className="wrap">
        <CheckoutSteps current="shipping" />
        <h1 className="display-2" style={{ fontSize: 30, marginBottom: 10 }}>
          Where should this go?
        </h1>
        <p className="body" style={{ color: "var(--text-on-light-dim)", marginBottom: 28 }}>
          We'll only use this to ship your order and send tracking.
        </p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <Field label="Full name" value={shipping.name} error={errors.name} onChange={(v) => update("name", v)} />
            <Field label="Email" type="email" value={shipping.email} error={errors.email} onChange={(v) => update("email", v)} />
            <Field label="Address" value={shipping.address} error={errors.address} onChange={(v) => update("address", v)} full />
            <Field label="City" value={shipping.city} error={errors.city} onChange={(v) => update("city", v)} />
            <Field label="Postal code" value={shipping.postal} error={errors.postal} onChange={(v) => update("postal", v)} />
          </div>

          <div className="form-actions">
            <Link to="/cart" className="btn btn-outline-light">← Back to cart</Link>
            <button type="submit" className="btn btn-primary">Continue to payment</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, type = "text", full = false }) {
  return (
    <label className={`field ${full ? "field--full" : ""}`}>
      <span className="mono field__label">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={error ? "field__input field__input--error" : "field__input"}
      />
      {error && <span className="form-error" role="alert">{error}</span>}
    </label>
  );
}
