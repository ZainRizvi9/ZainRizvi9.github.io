import { PLAYERS, currentGoals } from "../data/playersData";
import { t } from "../i18n/translations";
import PlayerBadge from "./PlayerBadge";
import "./LegendsLineup.css";

const RANK_LABEL = ["1", "2", "3", "4", "5", "6"];

export default function LegendsLineup({ lang }) {
  const ranked = [...PLAYERS].sort((a, b) => currentGoals(b.id) - currentGoals(a.id));
  const maxGoals = currentGoals(ranked[0].id);

  return (
    <section className="legends-lineup">
      <h2 className="legends-lineup__title">{t(lang, "legendsTitle")}</h2>
      <div className="legends-lineup__list">
        {ranked.map((player, i) => {
          const goals = currentGoals(player.id);
          const pct = Math.max(8, (goals / maxGoals) * 100);
          return (
            <div
              key={player.id}
              className={`legends-row ${player.status === "eliminated" ? "is-eliminated" : ""} ${i < 3 ? "is-podium" : ""}`}
            >
              <span className={`legends-row__rank rank-${i + 1}`}>{RANK_LABEL[i]}</span>
              <PlayerBadge player={player} size="md" />
              <div className="legends-row__meta">
                <span className="legends-row__name">{player.name[lang]}</span>
                <span className={`legends-row__status ${player.status === "eliminated" ? "is-out" : "is-alive"}`}>
                  {t(lang, player.status === "eliminated" ? "statusEliminated" : "statusAlive")}
                </span>
              </div>
              <div className="legends-row__bar-track">
                <div className="legends-row__bar" style={{ width: `${pct}%`, background: player.color }} />
              </div>
              <span className="legends-row__goals">
                {goals} <small>{t(lang, "currentTally")}</small>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
