import { useState } from "react";
import LanguageToggle from "./components/LanguageToggle";
import ScoreboardStats from "./components/ScoreboardStats";
import HeadToHead from "./components/HeadToHead";
import PlayerContributionsChart from "./components/PlayerContributionsChart";
import GoalsVsXGChart from "./components/GoalsVsXGChart";
import LegendsLineup from "./components/LegendsLineup";
import { t } from "./i18n/translations";
import "./App.css";

export default function App() {
  const [lang, setLang] = useState("en");

  return (
    <div className="page">
      <header className="hero">
        <div className="hero__inner">
          <div className="hero__eyebrow">
            <span className="hero__live-dot" aria-hidden="true" />
            {t(lang, "heroEyebrow")}
          </div>
          <h1 className="hero__title">{t(lang, "title")}</h1>
          <p className="hero__subtitle">{t(lang, "subtitle")}</p>
          <LanguageToggle lang={lang} setLang={setLang} label={t(lang, "langLabel")} />
          <ScoreboardStats lang={lang} />
          <p className="hero__final-note">{t(lang, "progressFinal")}</p>
        </div>
      </header>

      <main className="content">
        <p className="content__intro">{t(lang, "intro")}</p>
        <HeadToHead lang={lang} />
        <div className="charts-grid">
          <PlayerContributionsChart lang={lang} />
          <GoalsVsXGChart lang={lang} />
        </div>
        <LegendsLineup lang={lang} />
      </main>

      <footer className="footer">
        <p>{t(lang, "footer")}</p>
      </footer>
    </div>
  );
}
