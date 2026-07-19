import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { GOLDEN_BOOT, getPlayerById } from "../data/playersData";
import { t } from "../i18n/translations";
import PlayerBadge from "./PlayerBadge";
import "./ChartCard.css";

const DECADES = [
  { id: "all", labelKey: "decadeAll", test: () => true },
  { id: "1990s", labelKey: "decade1990s", test: (y) => y >= 1990 && y < 2000 },
  { id: "2000s", labelKey: "decade2000s", test: (y) => y >= 2000 && y < 2010 },
  { id: "2010s", labelKey: "decade2010s", test: (y) => y >= 2010 },
];

function CustomTooltip({ active, payload, label, lang }) {
  if (!active || !payload || !payload.length) return null;
  const entry = GOLDEN_BOOT.find((g) => g.year === label);
  const player = getPlayerById(entry.playerId);
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__year">{label}</div>
      <div className="chart-tooltip__row">
        <span className="chart-tooltip__dot" style={{ background: player.color }} />
        {player.name[lang]}: <strong>{entry.goals}</strong> {t(lang, "goals").toLowerCase()}
      </div>
      {entry.shared && (
        <div className="chart-tooltip__pens">
          {t(lang, "sharedAward")} {entry.sharedWith}
        </div>
      )}
    </div>
  );
}

export default function GoldenBootChart({ lang }) {
  const [decade, setDecade] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2022);

  const decadeDef = DECADES.find((d) => d.id === decade);
  const data = useMemo(
    () => GOLDEN_BOOT.filter((g) => decadeDef.test(g.year)).map((g) => ({ year: g.year, goals: g.goals })),
    [decadeDef]
  );

  const selectedEntry = GOLDEN_BOOT.find((g) => g.year === selectedYear) || null;
  const selectedPlayer = selectedEntry ? getPlayerById(selectedEntry.playerId) : null;

  return (
    <section className="chart-card">
      <h2 className="chart-card__title">{t(lang, "chart2Title")}</h2>
      <p className="chart-card__context">{t(lang, "chart2Context")}</p>

      <div className="decade-filter" role="group" aria-label={t(lang, "chart2Title")}>
        {DECADES.map((d) => (
          <button
            key={d.id}
            type="button"
            className={`decade-filter__btn ${decade === d.id ? "is-active" : ""}`}
            aria-pressed={decade === d.id}
            onClick={() => setDecade(d.id)}
          >
            {t(lang, d.labelKey)}
          </button>
        ))}
      </div>

      <div className="chart-with-panel">
        <div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ top: 12, right: 24, bottom: 8, left: 0 }}>
              <CartesianGrid stroke="var(--cream-dim)" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fill: "var(--ink-soft)", fontSize: 12, fontFamily: "var(--font-mono)" }}
                axisLine={{ stroke: "var(--cream-dim)" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "var(--ink-soft)", fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip lang={lang} />} />
              <Bar
                dataKey="goals"
                radius={[3, 3, 0, 0]}
                cursor="pointer"
                onClick={(entry) => setSelectedYear(entry.year)}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.year}
                    fill={entry.year === selectedYear ? "var(--gold)" : "var(--pitch-bright)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="chart-card__hint">{t(lang, "clickHint")}</p>
        </div>

        {selectedPlayer && (
          <div className="stat-panel">
            <PlayerBadge player={selectedPlayer} size="lg" />
            <div className="stat-panel__name">{selectedPlayer.name[lang]}</div>
            <div className="stat-panel__year">{selectedYear}</div>
            <dl className="stat-panel__list">
              <div>
                <dt>{t(lang, "goals")}</dt>
                <dd>{selectedEntry.goals}</dd>
              </div>
            </dl>
            {selectedEntry.shared && (
              <p className="stat-panel__note">
                {t(lang, "sharedAward")} {selectedEntry.sharedWith}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
