import { useState } from "react";
import { Link } from "react-router-dom";

const MOODS = [
  { value: 5, label: "Loved it" },
  { value: 4, label: "Good" },
  { value: 3, label: "Okay" },
  { value: 2, label: "Not great" },
  { value: 1, label: "Rough" },
];

const REASONS = ["Browsing", "Bought something", "Comparing gear", "Just curious"];

export default function Survey() {
  const [rating, setRating] = useState(null);
  const [reason, setReason] = useState(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="checkout-page">
        <div className="wrap">
          <div className="confirmation">
            <span className="confirmation__check" aria-hidden="true">✓</span>
            <h1 className="display-2" style={{ fontSize: 30 }}>
              That's genuinely useful — thank you
            </h1>
            <p className="body-lg confirmation__copy">
              We read every one of these. If you left a comment, it goes straight to the
              product team this week.
            </p>
            <div className="confirmation__actions">
              <Link to="/shop" className="btn btn-primary">Back to shop</Link>
              <Link to="/" className="btn btn-outline-light">Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="wrap survey">
        <p className="eyebrow" style={{ color: "var(--text-on-light-dim)" }}>Two minutes, three questions</p>
        <h1 className="display-2" style={{ fontSize: 32, maxWidth: "16ch" }}>
          How was your visit today?
        </h1>
        <p className="body-lg" style={{ color: "var(--text-on-light-dim)", maxWidth: "48ch", marginTop: 12 }}>
          No account needed, nothing tracked beyond this page. Skip anything that
          doesn't apply.
        </p>

        <form className="survey-form" onSubmit={handleSubmit}>
          <fieldset className="survey-field">
            <legend className="mono survey-field__legend">Overall, how did it go?</legend>
            <div className="mood-row">
              {MOODS.map((m) => (
                <button
                  type="button"
                  key={m.value}
                  className={`mood-opt ${rating === m.value ? "mood-opt--active" : ""}`}
                  onClick={() => setRating(m.value)}
                  aria-pressed={rating === m.value}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="survey-field">
            <legend className="mono survey-field__legend">What brought you here?</legend>
            <div className="mood-row">
              {REASONS.map((r) => (
                <button
                  type="button"
                  key={r}
                  className={`mood-opt ${reason === r ? "mood-opt--active" : ""}`}
                  onClick={() => setReason(r)}
                  aria-pressed={reason === r}
                >
                  {r}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="survey-field">
            <span className="mono survey-field__legend">Anything we should know? (optional)</span>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Sizing ran small, filters felt slow, loved the jacket — anything at all."
            />
          </label>

          <button type="submit" className="btn btn-primary">Send feedback</button>
        </form>
      </div>
    </div>
  );
}
