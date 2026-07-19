import { getHeadlineStats, tournamentProgress } from "../data/playersData";
import { t } from "../i18n/translations";
import "./ScoreboardStats.css";

export default function ScoreboardStats({ lang }) {
  const stats = getHeadlineStats();
  const progress = tournamentProgress();

  const tiles = [
    { value: stats.playersTracked, label: t(lang, "statPlayers") },
    { value: stats.stillAlive, label: t(lang, "statAlive") },
    { value: stats.topGoals, label: t(lang, "statTopGoals") },
    { value: `${progress.completed}/${progress.total}`, label: t(lang, "progressRounds") },
    { value: stats.daysToFinal, label: t(lang, "statDaysToFinal") },
  ];

  return (
    <div className="stat-bar">
      {tiles.map((tile, i) => (
        <div key={tile.label} className="stat-bar__item">
          <span className="stat-bar__value">{tile.value}</span>
          <span className="stat-bar__label">{tile.label}</span>
        </div>
      ))}
    </div>
  );
}
