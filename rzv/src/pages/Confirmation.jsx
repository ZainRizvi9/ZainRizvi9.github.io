import { Link, Navigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCheckout } from "../context/CheckoutContext";

export default function Confirmation() {
  const { orderNumber, shipping, resetCheckout } = useCheckout();

  if (!orderNumber) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div className="checkout-page">
      <div className="wrap">
        <CheckoutSteps current="confirmation" />

        <div className="confirmation">
          <span className="confirmation__check" aria-hidden="true">✓</span>
          <p className="eyebrow" style={{ color: "var(--text-on-light-dim)" }}>Order confirmed</p>
          <h1 className="display-2" style={{ fontSize: 34 }}>
            Thanks, {shipping.name.split(" ")[0] || "there"} — it's on the way
          </h1>
          <p className="mono confirmation__order">Order {orderNumber}</p>
          <p className="body-lg confirmation__copy">
            A confirmation has been sent to {shipping.email || "your email"}. Your gear ships from our
            Ottawa warehouse within 1–2 business days.
          </p>

          <div className="confirmation__actions">
            <Link to="/shop" className="btn btn-primary" onClick={resetCheckout}>
              Keep shopping
            </Link>
            <Link to="/survey" className="btn btn-outline-light">
              Tell us how this went
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
