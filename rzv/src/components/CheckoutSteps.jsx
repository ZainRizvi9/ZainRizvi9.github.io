const STEPS = [
  { key: "cart", label: "Cart" },
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
  { key: "confirmation", label: "Confirmation" },
];

export default function CheckoutSteps({ current }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <ol className="steps" aria-label="Checkout progress">
      {STEPS.map((step, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
        return (
          <li key={step.key} className={`steps__item steps__item--${state}`}>
            <span className="steps__marker" aria-hidden="true">
              {state === "done" ? "✓" : i + 1}
            </span>
            <span className="steps__label">
              {step.label}
              {state === "current" && <span className="steps__you"> — you are here</span>}
            </span>
            {i < STEPS.length - 1 && <span className="steps__connector" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
