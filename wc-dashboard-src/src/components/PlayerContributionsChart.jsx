import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PLAYERS, ROUNDS, currentGoals, currentAssists } from "../data/playersData";
import { t } from "../i18n/translations";
import PlayerBadge from "./PlayerBadge";
import "./DarkCard.css";

const METRICS = ["goals", "assists", "ga"];

function valueFor(player, roundId, metric) {
  const g = player.goals[roundId];
  const a = player.assists[roundId];
  if (metric === "goals") return g;
  if (metric === "assists") return a;
  if (g == null) return null;
  return g + (a ?? 0);
}

function buildChartData(metric) {
  return ROUNDS.map((round) => {
    const row = { round: round.id };
    PLAYERS.forEach((player) => {
      row[player.id] = valueFor(player, round.id, metric);
    });
    return row;
  });
}

function currentValue(player, metric) {
  if (metric === "goals") return currentGoals(player.id);
  if (metric === "assists") return currentAssists(player.id);
  const g = currentGoals(player.id);
  const a = currentAssists(player.id);
  return g + (a ?? 0);
}

function CustomTooltip({ active, payload, label, lang, metric }) {
  if (!active || !payload || !payload.length) return null;
  const round = ROUNDS.find((r) => r.id === label);
  const rows = payload
    .filter((entry) => entry.value != null)
    .sort((a, b) => b.value - a.value);
  if (!rows.length) return null;
  return (
    <div className="mini-tooltip">
      <span className="mini-tooltip__round">{round[lang]}</span>
      {rows.map((entry) => {
        const player = PLAYERS.find((p) => p.id === entry.dataKey);
        const flagAssist = metric !== "goals" && player.assists[label] == null;
        return (
          <span key={entry.dataKey} className="mini-tooltip__value" style={{ color: entry.color }}>
            {player.name[lang]}: {entry.value}
            {flagAssist && <span className="mini-tooltip__flag"> ({t(lang, "noAssistData")})</span>}
          </span>
        );
      })}
    </div>
  );
}

export default function PlayerContributionsChart({ lang }) {
  const [metric, setMetric] = useState("goals");
  const [selected, setSelected] = useState(PLAYERS.map((p) => p.id));
  const [hovered, setHovered] = useState(null);

  const data = useMemo(() => buildChartData(metric), [metric]);
  const ranked = useMemo(
    () => [...PLAYERS].sort((a, b) => currentGoals(b.id) - currentGoals(a.id)),
    []
  );

  const togglePlayer = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]));
  };

  const spotlightId = hovered || (selected.length === 1 ? selected[0] : null);

  return (
    <section className="dark-card">
      <h2 className="dark-card__title">{t(lang, "chart1Title")}</h2>
      <p className="dark-card__context">{t(lang, "chart1Context")}</p>

      <div className="metric-toggle metric-toggle--dark" role="group" aria-label="metric">
        {METRICS.map((m) => (
          <button
            key={m}
            type="button"
            className={`metric-toggle__btn metric-toggle__btn--dark ${metric === m ? "is-active" : ""}`}
            aria-pressed={metric === m}
            onClick={() => setMetric(m)}
          >
            {t(lang, m === "goals" ? "metricGoals" : m === "assists" ? "metricAssists" : "metricGA")}
          </button>
        ))}
      </div>

      <div className="player-chip-row">
        <div className="player-chip-row__actions">
          <span className="player-chip-row__label">{t(lang, "selectPlayers")}</span>
          <button className="player-chip-row__link" onClick={() => setSelected(PLAYERS.map((p) => p.id))}>
            {t(lang, "selectAll")}
          </button>
          <button className="player-chip-row__link" onClick={() => setSelected([])}>
            {t(lang, "clearAll")}
          </button>
        </div>
        <div className="player-chip-row__chips">
          {ranked.map((player) => {
            const val = currentValue(player, metric);
            return (
              <button
                key={player.id}
                type="button"
                className={`player-chip-v2 ${selected.includes(player.id) ? "is-active" : ""} ${player.status === "eliminated" ? "is-eliminated" : ""}`}
                style={{ "--chip-color": player.color }}
                aria-pressed={selected.includes(player.id)}
                onClick={() => togglePlayer(player.id)}
                onMouseEnter={() => setHovered(player.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <PlayerBadge player={player} size="sm" />
                <span className="player-chip-v2__name">{player.name[lang]}</span>
                <span className="player-chip-v2__val">{val ?? "—"}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selected.length === 0 ? (
        <p className="chart-card__empty">{t(lang, "chart1Empty")}</p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 12, right: 20, bottom: 8, left: 0 }}>
            <CartesianGrid stroke="rgba(247,245,240,0.08)" vertical={false} />
            <XAxis
              dataKey="round"
              tickFormatter={(id) => {
                const r = ROUNDS.find((rd) => rd.id === id);
                return lang === "es" ? r.shortEs : r.shortEn;
              }}
              tick={{ fill: "var(--cream-dim)", fontSize: 11, fontFamily: "var(--font-mono)" }}
              axisLine={{ stroke: "rgba(247,245,240,0.15)" }}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "var(--cream-dim)", fontSize: 11, fontFamily: "var(--font-mono)" }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip content={<CustomTooltip lang={lang} metric={metric} />} />
            {PLAYERS.filter((p) => selected.includes(p.id)).map((player) => {
              const isDimmed = spotlightId && spotlightId !== player.id;
              return (
                <Line
                  key={player.id}
                  type="monotone"
                  dataKey={player.id}
                  stroke={player.color}
                  strokeWidth={spotlightId === player.id ? 3.5 : 2.25}
                  strokeOpacity={isDimmed ? 0.18 : 1}
                  dot={{ r: 3, fill: player.color, strokeWidth: 0, fillOpacity: isDimmed ? 0.18 : 1 }}
                  activeDot={{ r: 6 }}
                  connectNulls={false}
                  isAnimationActive={false}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
