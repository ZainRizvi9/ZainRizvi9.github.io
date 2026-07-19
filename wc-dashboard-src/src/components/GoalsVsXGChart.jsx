import { useState, useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { PLAYERS, getPlayerById, currentGoals, xGDelta, formatDecimal } from "../data/playersData";
import { t } from "../i18n/translations";
import PlayerBadge from "./PlayerBadge";
import "./DarkCard.css";

function CustomTooltip({ active, payload, lang }) {
  if (!active || !payload || !payload.length) return null;
  const { id } = payload[0].payload;
  const player = getPlayerById(id);
  if (!player) return null;
  return (
    <div className="mini-tooltip mini-tooltip--wide">
      <span className="mini-tooltip__round">{player.name[lang]}</span>
      <span className="mini-tooltip__value">
        {t(lang, "goals")}: {currentGoals(id)}
      </span>
      <span className="mini-tooltip__sub">
        {t(lang, "xG")}: {player.xG != null ? formatDecimal(player.xG, lang) : t(lang, "xGNotAvailable")}
      </span>
    </div>
  );
}

export default function GoalsVsXGChart({ lang }) {
  const [selectedId, setSelectedId] = useState("mbappe");

  const data = useMemo(
    () =>
      [...PLAYERS]
        .sort((a, b) => currentGoals(b.id) - currentGoals(a.id))
        .map((p) => ({
          id: p.id,
          name: p.name[lang],
          short: p.name[lang].trim().split(" ").slice(-1)[0],
          goals: currentGoals(p.id),
          xG: p.xG,
          color: p.color,
        })),
    [lang]
  );

  const selectedPlayer = getPlayerById(selectedId);
  const delta = selectedPlayer ? xGDelta(selectedId) : null;

  let deltaLabel = t(lang, "xGNotAvailable");
  if (delta != null) {
    if (delta > 0.15) deltaLabel = `+${formatDecimal(delta, lang)} ${t(lang, "overperform")}`;
    else if (delta < -0.15) deltaLabel = `${formatDecimal(delta, lang)} ${t(lang, "underperform")}`;
    else deltaLabel = t(lang, "onPace");
  }

  return (
    <section className="dark-card">
      <h2 className="dark-card__title">{t(lang, "chart2Title")}</h2>
      <p className="dark-card__context">{t(lang, "chart2Context")}</p>

      <div className="xg-legend">
        <span className="xg-legend__item">
          <span className="xg-legend__swatch xg-legend__swatch--bar" /> {t(lang, "goals")}
        </span>
        <span className="xg-legend__item">
          <span className="xg-legend__swatch xg-legend__swatch--dot" /> {t(lang, "xG")}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 16, right: 16, bottom: 40, left: 8 }}
          onClick={(state) => {
            const idx = state?.activeTooltipIndex;
            if (idx != null) setSelectedId(data[idx].id);
          }}
        >
          <CartesianGrid stroke="rgba(247,245,240,0.08)" vertical={false} />
          <XAxis
            dataKey="short"
            tick={{ fill: "var(--cream-dim)", fontSize: 10.5, fontFamily: "var(--font-mono)" }}
            axisLine={{ stroke: "rgba(247,245,240,0.15)" }}
            tickLine={false}
            angle={-20}
            textAnchor="end"
            height={50}
          />
          <YAxis
            tick={{ fill: "var(--cream-dim)", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
            width={26}
          />
          <Tooltip content={<CustomTooltip lang={lang} />} cursor={{ fill: "rgba(247,245,240,0.06)" }} />
          <Bar dataKey="goals" radius={[5, 5, 0, 0]} cursor="pointer" maxBarSize={46}>
            {data.map((entry) => (
              <Cell
                key={entry.id}
                fill={entry.id === selectedId ? "var(--gold-bright)" : "var(--gold)"}
              />
            ))}
          </Bar>
          <Line
            dataKey="xG"
            stroke="none"
            dot={{ r: 6, fill: "var(--pitch-bright)", stroke: "var(--card-dark)", strokeWidth: 2 }}
            isAnimationActive={false}
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="dark-card__hint">{t(lang, "clickHint")}</p>

      {selectedPlayer && (
        <div className="dark-stat-strip">
          <PlayerBadge player={selectedPlayer} size="lg" />
          <div className="dark-stat-strip__name">{selectedPlayer.name[lang]}</div>
          <dl className="dark-stat-strip__list">
            <div>
              <dt>{t(lang, "goals")}</dt>
              <dd>{currentGoals(selectedId)}</dd>
            </div>
            <div>
              <dt>{t(lang, "xG")}</dt>
              <dd>{selectedPlayer.xG != null ? formatDecimal(selectedPlayer.xG, lang) : "—"}</dd>
            </div>
          </dl>
          <p className="dark-stat-strip__note">{deltaLabel}</p>
        </div>
      )}
    </section>
  );
}
