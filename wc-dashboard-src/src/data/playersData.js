// FIFA World Cup 2026 — live tournament data.
// Compiled from FIFA official stats, ESPN, Yahoo Sports, Goal.com, FotMob,
// Fox Sports and wire coverage as of July 18, 2026 — the semifinals have
// been played (Argentina 2-1 England; Spain beat France), and the final
// (Argentina vs Spain) is tomorrow, July 19, 2026. England and France now
// meet in the third-place playoff. Round-by-round splits are reconstructed
// from match reports and are approximate where exact match-by-match timing
// wasn't stated; current totals (goals, assists, xG) are official/aggregated.

export const ROUNDS = [
  { id: "group", en: "Group Stage", es: "Fase de Grupos", shortEn: "GS", shortEs: "FG" },
  { id: "r32", en: "Round of 32", es: "Dieciseisavos", shortEn: "R32", shortEs: "D16" },
  { id: "r16", en: "Round of 16", es: "Octavos de Final", shortEn: "R16", shortEs: "O16" },
  { id: "qf", en: "Quarterfinal", es: "Cuartos de Final", shortEn: "QF", shortEs: "CF" },
  { id: "sf", en: "Semifinal", es: "Semifinal", shortEn: "SF", shortEs: "SF" },
  { id: "final", en: "Final", es: "Final", shortEn: "F", shortEs: "F" },
];

export const TEAM_CODES = {
  france: "FRA",
  argentina: "ARG",
  norway: "NOR",
  england: "ENG",
};

export const PLAYERS = [
  {
    id: "mbappe",
    name: { en: "Kylian Mbappé", es: "Kylian Mbappé" },
    team: "france",
    color: "#3B82F6",
    status: "eliminated", // lost semifinal to Spain; now in 3rd-place playoff vs England
    xG: 5.39,
    goals: { group: 4, r32: 6, r16: 7, qf: 8, sf: 8, final: null },
    assists: { group: null, r32: null, r16: null, qf: 3, sf: 3, final: null },
  },
  {
    id: "messi",
    name: { en: "Lionel Messi", es: "Lionel Messi" },
    team: "argentina",
    color: "#EC4899",
    status: "alive", // through to the final vs Spain
    xG: 5.27,
    goals: { group: 6, r32: 7, r16: 8, qf: 8, sf: 8, final: null },
    // 2 assists in the 2-1 semifinal win over England (Enzo Fernández, Lautaro Martínez)
    assists: { group: null, r32: null, r16: null, qf: 2, sf: 4, final: null },
  },
  {
    id: "haaland",
    name: { en: "Erling Haaland", es: "Erling Haaland" },
    team: "norway",
    color: "#EF4444",
    status: "eliminated", // out in the quarterfinals
    xG: 4.4,
    goals: { group: 4, r32: 5, r16: 7, qf: 7, sf: 7, final: null },
    assists: { group: null, r32: null, r16: null, qf: null, sf: null, final: null },
  },
  {
    id: "kane",
    name: { en: "Harry Kane", es: "Harry Kane" },
    team: "england",
    color: "#2DD4BF",
    status: "eliminated", // lost semifinal to Argentina; now in 3rd-place playoff vs France
    xG: 3.53,
    goals: { group: 3, r32: 5, r16: 6, qf: 6, sf: 6, final: null },
    assists: { group: null, r32: null, r16: 1, qf: 1, sf: 1, final: null },
  },
  {
    id: "bellingham",
    name: { en: "Jude Bellingham", es: "Jude Bellingham" },
    team: "england",
    color: "#A855F7",
    status: "eliminated", // lost semifinal to Argentina
    xG: 2.6,
    goals: { group: 2, r32: 2, r16: 4, qf: 6, sf: 6, final: null },
    assists: { group: null, r32: null, r16: null, qf: null, sf: 1, final: null },
  },
  {
    id: "dembele",
    name: { en: "Ousmane Dembélé", es: "Ousmane Dembélé" },
    team: "france",
    color: "#FB923C",
    status: "eliminated", // lost semifinal to Spain
    xG: 1.52,
    goals: { group: 3, r32: 3, r16: 4, qf: 5, sf: 5, final: null },
    assists: { group: null, r32: null, r16: null, qf: null, sf: null, final: null },
  },
];

export function getPlayerById(id) {
  return PLAYERS.find((p) => p.id === id) || null;
}

// Latest non-null checkpoint reached so far this tournament
export function currentGoals(playerId) {
  const player = getPlayerById(playerId);
  const vals = ROUNDS.map((r) => player.goals[r.id]).filter((v) => v != null);
  return vals.length ? vals[vals.length - 1] : 0;
}

export function currentAssists(playerId) {
  const player = getPlayerById(playerId);
  const vals = ROUNDS.map((r) => player.assists[r.id]).filter((v) => v != null);
  return vals.length ? vals[vals.length - 1] : null;
}

export function xGDelta(playerId) {
  const player = getPlayerById(playerId);
  if (player.xG == null) return null;
  return +(currentGoals(playerId) - player.xG).toFixed(2);
}

// Locale-aware decimal formatting: EN uses a period (5.39), ES uses a comma (5,39)
export function formatDecimal(value, lang) {
  if (value == null) return null;
  return lang === "es" ? value.toString().replace(".", ",") : value.toString();
}

export function getHeadlineStats() {
  return {
    playersTracked: PLAYERS.length,
    stillAlive: PLAYERS.filter((p) => p.status === "alive").length,
    topGoals: Math.max(...PLAYERS.map((p) => currentGoals(p.id))),
    daysToFinal: 1, // as of July 18, 2026; final is July 19, 2026
  };
}

export function tournamentProgress() {
  const completed = ROUNDS.filter((r) => PLAYERS.some((p) => p.goals[r.id] != null)).length;
  return {
    completed,
    total: ROUNDS.length,
    pct: Math.round((completed / ROUNDS.length) * 100),
  };
}
