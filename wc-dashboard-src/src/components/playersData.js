// FIFA World Cup 2026 — live tournament data.
// Compiled from FIFA official stats, ESPN, Goal.com, FotMob and wire coverage
// as of July 14, 2026 (through the quarterfinals; semifinals played July
// 15-16, final July 19). Round-by-round splits are reconstructed from match
// reports and are approximate where an exact match-by-match timeline wasn't
// stated; current totals (goals, assists, xG) are official/aggregated stats.

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
    color: "#1E3A8A",
    status: "alive",
    xG: 5.39,
    goals: { group: 4, r32: 6, r16: 7, qf: 8, sf: null, final: null },
    assists: { group: null, r32: null, r16: null, qf: 3, sf: null, final: null },
  },
  {
    id: "messi",
    name: { en: "Lionel Messi", es: "Lionel Messi" },
    team: "argentina",
    color: "#75AADB",
    status: "alive",
    xG: 5.27,
    goals: { group: 6, r32: 7, r16: 8, qf: 8, sf: null, final: null },
    assists: { group: null, r32: null, r16: null, qf: 2, sf: null, final: null },
  },
  {
    id: "haaland",
    name: { en: "Erling Haaland", es: "Erling Haaland" },
    team: "norway",
    color: "#BA0C2F",
    status: "eliminated",
    xG: 4.4,
    goals: { group: 4, r32: 5, r16: 7, qf: 7, sf: null, final: null },
    assists: { group: null, r32: null, r16: null, qf: null, sf: null, final: null },
  },
  {
    id: "kane",
    name: { en: "Harry Kane", es: "Harry Kane" },
    team: "england",
    color: "#7A1F2B",
    status: "alive",
    xG: 3.53,
    goals: { group: 3, r32: 5, r16: 6, qf: 6, sf: null, final: null },
    assists: { group: null, r32: null, r16: 1, qf: 1, sf: null, final: null },
  },
  {
    id: "bellingham",
    name: { en: "Jude Bellingham", es: "Jude Bellingham" },
    team: "england",
    color: "#C8102E",
    status: "alive",
    xG: 2.6,
    goals: { group: 2, r32: 2, r16: 4, qf: 6, sf: null, final: null },
    assists: { group: null, r32: null, r16: null, qf: null, sf: null, final: null },
  },
  {
    id: "dembele",
    name: { en: "Ousmane Dembélé", es: "Ousmane Dembélé" },
    team: "france",
    color: "#ED2939",
    status: "alive",
    xG: 1.52,
    goals: { group: 3, r32: 3, r16: 4, qf: 5, sf: null, final: null },
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

export function getHeadlineStats() {
  return {
    playersTracked: PLAYERS.length,
    stillAlive: PLAYERS.filter((p) => p.status === "alive").length,
    topGoals: Math.max(...PLAYERS.map((p) => currentGoals(p.id))),
    daysToFinal: 5, // as of July 14, 2026; final is July 19, 2026
  };
}
