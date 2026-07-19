import "./LanguageToggle.css";

export default function LanguageToggle({ lang, setLang, label }) {
  return (
    <div className="scoreboard-toggle" role="group" aria-label={label}>
      <span className="scoreboard-toggle__label">{label}</span>
      <div className="scoreboard-toggle__body">
        <button
          type="button"
          className={`scoreboard-toggle__flap ${lang === "en" ? "is-active" : ""}`}
          onClick={() => setLang("en")}
          aria-pressed={lang === "en"}
        >
          EN
        </button>
        <button
          type="button"
          className={`scoreboard-toggle__flap ${lang === "es" ? "is-active" : ""}`}
          onClick={() => setLang("es")}
          aria-pressed={lang === "es"}
        >
          ES
        </button>
      </div>
    </div>
  );
}
