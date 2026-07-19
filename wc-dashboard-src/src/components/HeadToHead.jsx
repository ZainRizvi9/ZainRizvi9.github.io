import { useState, useMemo } from "react";
import { PLAYERS, currentGoals, currentAssists, formatDecimal } from "../data/playersData";
import { t } from "../i18n/translations";
import PlayerBadge from "./PlayerBadge";
import "./HeadToHead.css";

function Row({ label, leftVal, rightVal, leftColor, rightColor, formatVal }) {
  const l = leftVal ?? 0;
  const r = rightVal ?? 0;
  const total = l + r;
  const leftPct = total > 0 ? (l / total) * 100 : 50;
  const rightPct = 100 - leftPct;

  return (
    <div className="h2h-row">
      <span className="h2h-row__val h2h-row__val--left">
        {leftVal == null ? "—" : formatVal ? formatVal(leftVal) : leftVal}
      </span>
      <div className="h2h-row__track">
        <div className="h2h-row__bar h2h-row__bar--left" style={{ width: `${leftPct}%`, background: leftColor }} />
        <div className="h2h-row__bar h2h-row__bar--right" style={{ width: `${rightPct}%`, background: rightColor }} />
      </div>
      <span className="h2h-row__val h2h-row__val--right">
        {rightVal == null ? "—" : formatVal ? formatVal(rightVal) : rightVal}
      </span>
      <span className="h2h-row__label">{label}</span>
    </div>
  );
}

export default function HeadToHead({ lang }) {
  const ranked = useMemo(
    () => [...PLAYERS].sort((a, b) => currentGoals(b.id) - currentGoals(a.id)),
    []
  );
  const [leftId, setLeftId] = useState(ranked[0].id);
  const [rightId, setRightId] = useState(ranked[1].id);

  const left = PLAYERS.find((p) => p.id === leftId);
  const right = PLAYERS.find((p) => p.id === rightId);

  const swap = () => {
    setLeftId(rightId);
    setRightId(leftId);
  };

  return (
    <section className="dark-card h2h-card">
      <h2 className="dark-card__title">{t(lang, "h2hTitle")}</h2>
      <p className="dark-card__context">{t(lang, "h2hContext")}</p>

      <div className="h2h-selects">
        <select className="h2h-select" value={leftId} onChange={(e) => setLeftId(e.target.value)}>
          {PLAYERS.map((p) => (
            <option key={p.id} value={p.id}>{p.name[lang]}</option>
          ))}
        </select>
        <button className="h2h-swap" onClick={swap} aria-label="swap">⇄</button>
        <select className="h2h-select" value={rightId} onChange={(e) => setRightId(e.target.value)}>
          {PLAYERS.map((p) => (
            <option key={p.id} value={p.id}>{p.name[lang]}</option>
          ))}
        </select>
      </div>

      <div className="h2h-heads">
        <div className="h2h-head">
          <PlayerBadge player={left} size="lg" />
          <span className="h2h-head__name">{left.name[lang]}</span>
        </div>
        <span className="h2h-heads__vs">VS</span>
        <div className="h2h-head">
          <PlayerBadge player={right} size="lg" />
          <span className="h2h-head__name">{right.name[lang]}</span>
        </div>
      </div>

      <div className="h2h-rows">
        <Row
          label={t(lang, "metricGoals")}
          leftVal={currentGoals(leftId)}
          rightVal={currentGoals(rightId)}
          leftColor={left.color}
          rightColor={right.color}
        />
        <Row
          label={t(lang, "metricAssists")}
          leftVal={currentAssists(leftId)}
          rightVal={currentAssists(rightId)}
          leftColor={left.color}
          rightColor={right.color}
        />
        <Row
          label={t(lang, "xG")}
          leftVal={left.xG}
          rightVal={right.xG}
          leftColor={left.color}
          rightColor={right.color}
          formatVal={(v) => formatDecimal(v, lang)}
        />
      </div>
    </section>
  );
}
